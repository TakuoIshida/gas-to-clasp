type User = {
  name: string;
  age: number;
};

export function sample() {
  console.log("Hello, World!");

  const user: User = {
    name: "John",
    age: 30,
  };

  console.log(`${user.name} is ${user.age} years old`);
}
