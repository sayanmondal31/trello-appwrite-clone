import { database } from "@/appwrite";
import { Board, Column, TypedColumn } from "@/typings";

export const getTodosGroupedByColumn = async () => {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  //   fetching data from appwrite
  const todos = data.documents;

  //   reduce - reduce the array to a single value
  //   acc - accumulator
  //   acc.get(todo.status) - get the status of the todo
  //   if the status of the todo is not in the accumulator, add it to the accumulator
  //  return the accumulator

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      // if the status of the todo is not in the accumulator, add it to the accumulator
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    //  add the todo to the accumulator
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && {
        image: JSON.parse(todo.image),
      }),
    });

    return acc;
  }, new Map<TypedColumn, Column>()); // initial value of the accumulator

  //   console.log(columns);
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  console.log(columns, "columns");

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };
  return board;
};
