export const XPProgressGraph = ({xpProgress}) => {
  if (xpProgress.length === 0) return <div>No data</div>;

  const MaxXP = Math.max(...xpProgress.map((d) => d.xp));
  const width = 700;
  const height = 350;

  const points = xpProgress.map((point, index) => {
    const x = (index / (xpProgress.length - 1)) * width;
    const y = height - (point.xp / MaxXP) * height;
    return { x, y, ...point };
  });

  //Creating the SVG format for points
  const pathData = points
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const yLabels = [];
  const ySteps = 10;
  for (let i = 0; i <= ySteps; i++) {
    const value = (MaxXP * i) / ySteps;
    const y = height - (i / ySteps) * height;
    yLabels.push(
      <text
        key={`y-${i}`} //react need key 
        x="-10"
        y={y + 5}  // Calculated position + 5px adjustment
        fill="#bbb"
        fontSize="14"
        textAnchor="end"
      >
        {Math.round(value)}k
      </text>
    );
  }


  return (
    <svg width="100%" height="400" viewBox="0 0 800 400">
      <g transform="translate(40, 20)">

        {/* Y-axis line */}
        <line x1="0" y1="0" x2="0" y2={height} stroke="#666" strokeWidth="2" />

        {/* X-axis line */}
        <line
          x1="0"
          y1={height}
          x2={width}
          y2={height}
          stroke="#666"
          strokeWidth="2"
        />

        {/* The actual XP line that connects the dots */}
        <path d={pathData} fill="none" stroke="#9c2dfa" strokeWidth="3" />

        {/* Area under the line shade */}
        <path
          d={pathData + ` L ${width} ${height} L 0 ${height} Z`}
          fill="url(#gradient)"
          opacity="0.2"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#b866ff"
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={point.y - 10}
              fill="#fff"
              fontSize="10"
              textAnchor="middle"
              style={{ display: i % 3 === 0 ? "block" : "none" }}
            >
              {Math.round(point.xp)}k
            </text>
          </g>
        ))}

        {/* Y-axis labels */}
        {yLabels}

        {/* X-axis labels */}
        {points.map((point, i) => (
          <text
            key={`x-${i}`}
            x={point.x}
            y={height + 20}
            fill="#888"
            fontSize="10"
            textAnchor="middle"
            transform={`rotate(-45, ${point.x}, ${height + 20})`}
          >
            {point.date.toLocaleDateString("en", {
              month: "short",
              day: "numeric",
            })}
          </text>
        ))}

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9c2dfa" />
            <stop offset="100%" stopColor="#9c2dfa" stopOpacity="0" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
};


