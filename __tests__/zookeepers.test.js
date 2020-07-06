const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs')

test("creates a zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Jack", id: "jhgdja3ng2" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Jack");
  expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
        id: "0",
        name: "Kim",
        age: 28,
        favoriteAnimal: "dolphin"
    },
    {
        id: "1",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin"
    },
  ];

  const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
        id: "0",
        name: "Kim",
        age: 28,
        favoriteAnimal: "dolphin"
    },
    {
        id: "1",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin"
    },
  ];

  const result = findById("0", startingZookeepers);

  expect(result.name).toBe("Kim");
});

test("validates age", () => {
  const zookeeper = {
    id: "0",
    name: "Kim",
    age: 28,
    favoriteAnimal: "dolphin"
  };

  const invalidZookeeper = {
    id: "0",
    name: "Kim",
    age: "28",
    favoriteAnimal: "dolphin"
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});