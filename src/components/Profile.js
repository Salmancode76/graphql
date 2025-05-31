import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";
import { BarChart } from "./BarChart";
import {XPProgressGraph} from "./XPProgressGraph"

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState("N/A");
  const [totalxp, setTotalxp] = useState(0);
  const [numtrans, setNumtrans] = useState(0);
  const [doneAudits, setdoneAudits] = useState(0);
  const [reciveAudits, setreciveAudits] = useState(0);
  const [xpProgress, setXpProgress] = useState([]);

  

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
      return;
    }

    const query = `
    query {
      user {
        id
        login
      }
      transaction(where: { type: { _eq: "xp" } }) {
        amount
        path
        createdAt
      }
      audit_done: transaction_aggregate(where: { type: { _eq: "up" } }) {
        aggregate {
          sum {
            amount
          }
        }
      }
      audit_received: transaction_aggregate(where: { type: { _eq: "down" } }) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  `;

    try {
      document.title="Profile";
      const parsedToken = JSON.parse(token);

      const response = await fetch(
        "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${parsedToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      const data = await response.json();
      console.table(data);

      const mainProjects = data.data.transaction.filter((a) => {
        return (
          a.path.includes("/bahrain/bh-module/") &&
          !a.path.includes("/piscine-js/")
        );
      });

      const temptotal = mainProjects.reduce((sum, trans) => {
        return sum + trans.amount;
      }, 0);

      setUser(data.data.user[0].login);
      setTotalxp(Math.round(temptotal / 1000));
      setNumtrans(mainProjects.length);
      setdoneAudits(data.data.audit_done.aggregate.sum.amount.toFixed());
      setreciveAudits(data.data.audit_received.aggregate.sum.amount.toFixed());

      // Processing graph data
      let cumulative = 0;
      const progressData = mainProjects
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((transc) => {
          cumulative += transc.amount;
          return {
            date: new Date(transc.createdAt),
            xp: cumulative / 1000,
            project: transc.path.split("/").pop(),
          };
        });

      //console.table(progressData);
      setXpProgress(progressData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  


  // On render
  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  return (
    <div className="profile-container2" id="profileContainer">
      <header>
        <div className="logo">GraphQL Profile</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="profile-header">
        <div className="avatar">{user[0].toUpperCase()}</div>
        <div className="profile-info">
          <h1>{user}</h1>
        </div>
      </div>

      <div className="stats-flex">
        <div className="stat_card">
          <h3>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            Total XP
          </h3>
          <div className="stat-value">{totalxp}kB</div>
          <div>Transactions: {numtrans}</div>
        </div>

        <div className="stat_card">
          <h3>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Audit Ratio
          </h3>
          <div className="stat-value">
            {(doneAudits / reciveAudits).toFixed(1)}
          </div>
          <div>
            Done: {doneAudits} Received: {reciveAudits}
          </div>
        </div>
      </div>
      <div className="Graphs">
        <div className="graph1">
          <div className="graphs_section">
            <h2>XP Progress Over Time</h2>
            <div className="graph_container" id="graph_container1">
              <XPProgressGraph xpProgress={xpProgress} />
            </div>
          </div>
        </div>

        <div className="graph2">
          <div className="graphs_section">
            <h2>Audit Comparison</h2>
            <div className="graph_container">
              <BarChart doneAudits={doneAudits} reciveAudits={reciveAudits} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Profile;
