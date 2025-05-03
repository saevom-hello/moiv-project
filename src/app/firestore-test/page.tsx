"use client" 

import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc, DocumentData } from "firebase/firestore";

export default function Page() {
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const fetchMessages = async () => {
    const snapshot = await getDocs(collection(db, "test"));
    const docs = snapshot.docs.map((doc) => doc.data());
    setMessages(docs);
  };

  const addMessage = async () => {
    await addDoc(collection(db, "test"), {
      message: "Hello from Moiv!",
      timestamp: new Date()
    });
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <main>
      <h1>🔥 Firestore 테스트</h1>
      <button onClick={addMessage}>테스트 데이터 추가</button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg.message}</li>
        ))}
      </ul>
    </main>
  );
}
