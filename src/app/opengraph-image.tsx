import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "إتقان — ملتقى العاملين على التقنيات القرآنية";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const readexRegular = await readFile(
  join(process.cwd(), "assets/fonts/ReadexPro-Regular.ttf")
);
const readexMedium = await readFile(
  join(process.cwd(), "assets/fonts/ReadexPro-Medium.ttf")
);
const readexBold = await readFile(
  join(process.cwd(), "assets/fonts/ReadexPro-Bold.ttf")
);

const photoData = await readFile(
  join(process.cwd(), "assets/og-photo.jpg"),
  "base64"
);
const photoSrc = `data:image/jpeg;base64,${photoData}`;



export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#071d18",
          overflow: "hidden",
          position: "relative",
          fontFamily: "Readex Pro",
        }}
      >
        {/* Left: Rotated photo area */}
        <div
          style={{
            position: "absolute",
            left: -200,
            top: -50,
            width: 750,
            height: 813,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ transform: "rotate(8deg)", flex: "none", display: "flex" }}>
            <div
              style={{
                width: 650,
                height: 730,
                overflow: "hidden",
                position: "relative",
                display: "flex",
              }}
            >
              <img
                src={photoSrc}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(27,87,73,0.2)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Text content */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 420,
            height: 630,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 32,
            paddingRight: 60,
          }}
        >


          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 14px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <span
              style={{
                fontFamily: "Readex Pro",
                fontWeight: 500,
                fontSize: 12,
                color: "#a6c9ba",
              }}
            >
              مبادرة لخدمة كتاب الله
            </span>
          </div>

          {/* Title stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 14,
              width: "100%",
            }}
          >
            <span
              style={{
                fontFamily: "Readex Pro",
                fontWeight: 700,
                fontSize: 64,
                color: "#ffffff",
                whiteSpace: "nowrap",
              }}
            >
              إتقان
            </span>
            <span
              style={{
                fontFamily: "Readex Pro",
                fontWeight: 500,
                fontSize: 24,
                color: "#cbd9d3",
              }}
            >
              ملتقى العاملين على التقنيات القرآنية
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 140,
              height: 2,
              background: "#2e8069",
            }}
          />

          {/* Stats */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "Readex Pro",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#3de096",
                }}
              >
                +1,500
              </span>
              <span
                style={{
                  fontFamily: "Readex Pro",
                  fontWeight: 400,
                  fontSize: 11,
                  color: "#a6c9ba",
                }}
              >
                مطور وباحث
              </span>
            </div>

            <div
              style={{
                width: 1,
                height: 32,
                background: "rgba(166,201,186,0.3)",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "Readex Pro",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#3de096",
                }}
              >
                +15
              </span>
              <span
                style={{
                  fontFamily: "Readex Pro",
                  fontWeight: 400,
                  fontSize: 11,
                  color: "#a6c9ba",
                }}
              >
                مشروع مفتوح
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Readex Pro",
          data: readexRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Readex Pro",
          data: readexMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Readex Pro",
          data: readexBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
