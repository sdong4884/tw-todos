import { useEffect, useState } from "react";
import type { Todo } from "../types/todos";

export default function useTodos() {
  // todos 데이터 localStorage에 저장
  const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]",
    );
    return savedTodos;
  });
  // todos가 변경될 경우에만, localStorage 업데이트
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 할 일 완료처리
  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id == id ? { ...todo, completed } : todo)),
    );
  }

  // 할 일 추가
  function addTodo(title: string) {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ]);
  }

  // 할 일 삭제
  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  // 완료한 할 일 삭제
  function deleteAllCompleted() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return {
    todos,
    setTodoCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompleted,
  };
}
