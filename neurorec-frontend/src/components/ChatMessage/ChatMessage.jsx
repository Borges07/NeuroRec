import styles from "./ChatMessage.module.css";

export function ChatMessage({ sender = "bot", text }) {
  if (!text) return null;

  const className =
    sender === "user"
      ? `${styles.message} ${styles.user}`
      : `${styles.message} ${styles.bot}`;

  return <div className={className}>{text}</div>;
}
