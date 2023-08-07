import React from 'react';  

const KamuYakin = () => {
  return (
  <div style={{
    display: 'flex',
    width: "304px",
    height: "379px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    borderRadius: "20px",
    background: "#1F1F2E",
    boxShadow: "0px 4px 20px 0px rgba(255, 252, 131, 0.40)"
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
    }}>Kamu yakin
      <br />
      ingin
      <br />
      mengakhiri
      <br />
      percakapan
      <br />
      ini?
    </p>
      <div style={{
        display: "flex",
        gap: "20px"
      }}>
        <button style={{
          display: "flex",
          width: "119.5px",
          padding: "12px 0px",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          borderRadius: "12px",
          border: "2px solid var(--yellow-yellow-5, #FFFC83)",
          background: "var(--gray-color-gray-600, #2F2E2E)",
          }}>
          <p style={{
            color: "var(--yellow-yellow-5, #FFFC83)",
            fontFeatureSettings: "'cv04' on, 'cv03' on, 'cv02' on, 'cv11' on, 'clig' off, 'liga' off",
            fontFamily: "SomarRounded-Bold",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "150%" /* 24px */
          }}>Yakin</p>
        </button>
        <button style={{
          display: "flex",
          width: "119.5px",
          padding: "12px 0px",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          borderRadius: "12px",
          background: "var(--yellow-yellow-5, #FFFC83)",
        }}>  
          <p style={{
            color: "var(--purple-purple-2, #4909B3)",
            fontFeatureSettings: "'cv04' on, 'cv03' on, 'cv02' on, 'cv11' on, 'clig' off, 'liga' off",
            fontFamily: "SomarRounded-Bold",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "150%", /* 24px */
          }}>Gajadi hehe</p>
        </button>
      </div>
    </div>
  )
}

export default KamuYakin