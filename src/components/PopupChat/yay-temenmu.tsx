import React from 'react'

const YayTemenmu = () => {
  return (
    <div style={{
      display: "flex",
      width: "304px",
      paddingTop: "50px",
      paddingBottom: "50px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
      borderRadius: "20px",
      background: "#1F1F2E",
      boxShadow: "0px 4px 20px 0px rgba(255, 252, 131, 0.40)",
    }}>
      <p style={{
        color: "var(--yellow-yellow-4, #FFE655)",
        textAlign: "center",
        fontFamily: "Somar Rounded",
        fontSize: "32px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "100%", /* 32px */
        letterSpacing: "-0.32px",
      }}>Yay
      <br />
      temenmu
      <br />
      udah reveal
      <br />
      profil nih!
      </p>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
      }}>
        <button style={{
          display: "flex",
          padding: "12px 90px",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: "12px",
          alignSelf: "stretch",
          flexWrap: "wrap",
          borderRadius: "12px",
          background: "var(--yellow-yellow-5, #FFFC83)",
          cursor: "pointer",
        }}>
          <p style={{
            color: "var(--purple-purple-2, #4909B3)",
            textAlign: "center",
            fontFeatureSettings: "'cv04' on, 'cv03' on, 'cv02' on, 'cv11' on, 'clig' off, 'liga' off",
            fontFamily: "Somar Rounded",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "150%", /* 24px */
          }}>Kembali</p>
          </button>
      </div>
    </div>
  )
}

export default YayTemenmu