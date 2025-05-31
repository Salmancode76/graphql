export const BarChart = ({doneAudits,reciveAudits}) => {
  if (doneAudits === 0 || reciveAudits === 0)
    return <div>Loading audit data...</div>;

  const auditData = [
    {
      label: "Done",
      value: Math.round(doneAudits / 1000),
      color: "#4ecdc4",
    },
    {
      label: "Received",
      value: Math.round(reciveAudits / 1000),
      color: "#ff6b6b",
    },
  ];

  const maxValue = Math.max(...auditData.map((d) => d.value));
  const roundedMax = Math.ceil(maxValue / 100) * 100;

  // increased dimensions for a larger chart
  const width = 800;
  const height = 500;
  const padding = { top: 60, right: 60, bottom: 100, left: 80 };
  const ySteps = 6;

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "500px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <rect width={width} height={height} fill="transparent" />

        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="#666"
          strokeWidth="3"
        />

        {/* X-axis */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#666"
          strokeWidth="3"
        />

        {/* Y-axis labels and grid lines */}
        {Array.from({ length: ySteps + 1 }, (_, i) => {
          const value = (roundedMax * i) / ySteps;
          const y = height -padding.bottom - (i / ySteps) * (height - padding.top - padding.bottom);

          return (
            <g key={i}>
            
              {/* Y-axis label */}
              <text
                x={padding.left - 15}
                y={y + 6}
                fill="#bbb"
                fontSize="14"
                textAnchor="end"
                fontWeight="500"
              >
                {Math.round(value)}k
              </text>
            </g>
          );
        })}

        {auditData.map((item, i) => {
          const chartWidth = width - padding.left - padding.right;
          const chartHeight = height - padding.top - padding.bottom;

          const barWidth = Math.min(120, (chartWidth / auditData.length) * 0.5);
          const barSpacing = chartWidth / auditData.length;

          const barHeight = (item.value / roundedMax) * chartHeight;
          const x = padding.left + barSpacing * i + (barSpacing - barWidth) / 2;
          const y = height - padding.bottom - barHeight;

          return (
            <g key={i}>
              {/* Bar with gradient effect */}
              <defs>
                <linearGradient
                  id={`barGradient${i}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={item.color} stopOpacity="1" />
                  <stop
                    offset="100%"
                    stopColor={item.color}
                    stopOpacity="0.7"
                  />
                </linearGradient>
              </defs>

              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={`url(#barGradient${i})`}
                rx="8"
                ry="8"
                stroke={item.color}
                strokeWidth="2"
              />

              {/* Value label on top of bar */}
              <text
                x={x + barWidth / 2}
                y={y - 12}
                fill="#fff"
                fontSize="16"
                textAnchor="middle"
                fontWeight="bold"
              >
                {item.value}k
              </text>

              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y={height - padding.bottom + 30}
                fill="#ddd"
                fontSize="16"
                textAnchor="middle"
                fontWeight="600"
              >
                {item.label}
              </text>
            </g>
          );
        })}

        {/* Y-axis title */}
        <text
          x="30"
          y={height / 2}
          fill="#bbb"
          fontSize="14"
          textAnchor="middle"
          transform={`rotate(-90, 30, ${height / 2})`}
          fontWeight="500"
        ></text>

     
      </svg>
    </div>
  );
};

