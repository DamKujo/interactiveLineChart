import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import style from "./CustomTooltip.module.scss";

const CustomTooltip = ({
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (payload.length > 1) {
    payload = [...payload].sort((a, b) => b.value - a.value);
  }

  return (
    <div className={style.ctWrapper}>
      <div className={style.labelWithIcon}>
        <img src="/tz1.svg" alt="icon" />
        <p className="label">{label}</p>
      </div>
      <div>
        {payload.map((item, index) => (
          <div className={style.contentCT} key={item.name}>
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: `${item.color}`,
                  borderRadius: "50%",
                }}
              ></div>
              <p>
                {item.name}

                {payload.length > 1 && index === 0 ? (
                  <img
                    style={{ marginLeft: "10px" }}
                    src="./../public/winner.svg"
                    alt="winner-icon"
                  />
                ) : (
                  ""
                )}
              </p>
            </div>
            <p className={style.boldText}>{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTooltip;
