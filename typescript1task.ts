type User = {
  type: 'user';
  name: string;
  age: number;
};

type Admin = {
  type: 'admin';
  name: string;
  role: string;
};

type Person = User | Admin;

// Utility type to exclude 'type' from an object
type Criteria<T> = Partial<Omit<T, 'type'>>;

function filterPersons<T extends Person>(
  persons: Person[],
  personType: T['type'],
  criteria: Criteria<T>
): T[] {
  return persons.filter(
    (person): person is T =>
      person.type === personType &&
      Object.keys(criteria).every((key) => person[key as keyof T] === criteria[key as keyof T])
  );
}

// Example usage:
const people: Person[] = [
  { type: 'user', name: 'Alice', age: 25 },
  { type: 'admin', name: 'Bob', role: 'Manager' },
  { type: 'user', name: 'Charlie', age: 30 },
  { type: 'admin', name: 'David', role: 'Supervisor' },
];

const users = filterPersons(people, 'user', { age: 25 }); // Should return User[]
const admins = filterPersons(people, 'admin', { role: 'Manager' }); // Should return Admin[]

console.log(users);
console.log(admins);
