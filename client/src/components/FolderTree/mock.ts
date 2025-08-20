import type { FolderTreeOption } from "./FolderTree";

export const items: FolderTreeOption[] = [
  {
    id: 1,
    name: "Bulbasaur",
    children: [
      {
        id: 2,
        name: "Ivysaur",
        children: [
          {
            id: 3,
            name: "Venusaur",
            children: [
              { id: 10, name: "Venusaur Forms", children: [] },
              {
                id: 11,
                name: "Venusaur Extras",
                children: [
                  { id: 12, name: "Shiny Venusaur", children: [] },
                  { id: 13, name: "Shadow Venusaur", children: [] },
                ],
              },
            ],
          },
        ],
      },
      { id: 14, name: "Bulbasaur Notes", children: [] },
    ],
  },
  {
    id: 4,
    name: "Charmander",
    children: [
      {
        id: 5,
        name: "Charmeleon",
        children: [
          {
            id: 6,
            name: "Charizard",
            children: [
              { id: 15, name: "Charizard Wallpapers", children: [] },
              {
                id: 16,
                name: "Mega Evolutions",
                children: [
                  { id: 17, name: "Mega Charizard X", children: [] },
                  { id: 18, name: "Mega Charizard Y", children: [] },
                ],
              },
              {
                id: 19,
                name: "Random Stuff",
                children: [
                  {
                    id: 20,
                    name: "Old Backups",
                    children: [
                      { id: 21, name: "Charizard_v1", children: [] },
                      {
                        id: 22,
                        name: "Charizard_v2",
                        children: [
                          { id: 23, name: "final_draft", children: [] },
                          { id: 24, name: "final_draft_REAL", children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { id: 25, name: "Charmander Sketches", children: [] },
    ],
  },
  {
    id: 7,
    name: "Squirtle",
    children: [
      {
        id: 8,
        name: "Wartortle",
        children: [
          {
            id: 9,
            name: "Blastoise",
            children: [
              {
                id: 26,
                name: "Mega Blastoise",
                children: [
                  {
                    id: 27,
                    name: "Concepts",
                    children: [
                      { id: 28, name: "Early Design", children: [] },
                      { id: 29, name: "Final Design", children: [] },
                    ],
                  },
                ],
              },
              { id: 30, name: "Blastoise Moveset", children: [] },
              {
                id: 31,
                name: "Blastoise Fanart",
                children: [
                  { id: 32, name: "By Artist A", children: [] },
                  {
                    id: 33,
                    name: "By Artist B",
                    children: [
                      { id: 34, name: "Sketch 1", children: [] },
                      { id: 35, name: "Sketch 2", children: [] },
                      {
                        id: 36,
                        name: "Scraps",
                        children: [
                          { id: 37, name: "unfinished1", children: [] },
                          { id: 38, name: "unfinished2", children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { id: 39, name: "Squirtle Collection", children: [] },
      { id: 40, name: "Screenshots", children: [] },
    ],
  },
];
