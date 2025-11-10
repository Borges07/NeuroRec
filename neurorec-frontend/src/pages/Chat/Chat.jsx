import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../components/ChatMessage/ChatMessage.jsx";
import { CourseCard } from "../../components/CourseCard/CourseCard.jsx";
import { sendMessage } from "../../services/chatService.js";
import styles from "./Chat.module.css";

const initialGreeting = {
  id: "greeting",
  sender: "bot",
  text: "👋 Olá! Sou seu assistente de cursos. Em que posso te ajudar hoje?",
};

export function Chat() {
  const [messages, setMessages] = useState([initialGreeting]);
  const [input, setInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [isProcessing, setProcessing] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setCourses([]);
    setProcessing(true);

    try {
      const data = await sendMessage(trimmed);
      const reply = {
        id: `${Date.now()}-response`,
        sender: "bot",
        text:
          data?.resposta ??
          "Não consegui gerar uma resposta agora, tente novamente.",
      };

      setMessages((prev) => [...prev, reply]);
      setCourses(data?.cursos ?? []);
    } catch (error) {
      console.error("Erro ao enviar mensagem ao backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          sender: "bot",
          text: "❌ Erro ao processar sua mensagem. Verifique o backend.",
        },
      ]);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <header className={styles.header}>
          <h1>Recomendador de Cursos IA 💡</h1>
        </header>

        <div className={styles.chatArea}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              sender={message.sender}
              text={message.text}
            />
          ))}
          {isProcessing && (
            <ChatMessage
              sender="bot"
              text="⏳ Processando sua solicitação..."
            />
          )}
          {courses.length > 0 && (
            <>
              <ChatMessage
                sender="bot"
                text="📚 Aqui estão as recomendações:"
              />
              <div className={styles.courseList}>
                {courses.map((course) => (
                  <CourseCard key={course.id ?? course.name} course={course} />
                ))}
              </div>
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className={styles.inputBar} onSubmit={handleSubmit}>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className={styles.sendButton}
            type="submit"
            disabled={isProcessing}
          >
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
}
