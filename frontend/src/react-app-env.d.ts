// import { React } from 'react';
// /// <reference types="react-scripts" />

// // Defining the structure for computed browser properties
// interface ComputedBrowserProps {
//   Browser: string;
//   Platform: string;
//   Version: string;
// }

// // Defining the structure for basic browser properties
// interface BrowserProps {
//   platform: string;
// }

// // Defining the structure for each item within the data
// interface ItemProps {
//   id: string;
//   name: string;
//   price: string;
//   score: string;
//   reviews: number;
// }


// // Defining the structure of the overall data
// // interface DataProps {
// //   count: number;
// //   count_nolimit: number;
// //   items: ItemProps[];
// //   total: number;
// // }

// // Creating a new type for a MouseEvent on an HTML button element
// // This event includes a target with a specific type you pass
// type ClickRatingEvent<T extends Target> = MouseEvent<HTMLButtonElement> & {
//   target: T;
//   // Optionally, you might also want to include the currentTarget
//   // currentTarget: T;
// };

// // Defining the structure for a target with a value property
// interface Target {
//   value: string;
// }

// // Defining the structure for the props of a search component
// interface SearchProps {
//   setSearchValue: React.Dispatch<React.SetStateAction<string>>;
//   setRatingFilter: React.Dispatch<React.SetStateAction<string[]>>;
//   ratingFilter: string[];
// }

// // Exporting the types for use in other parts of the application
// export {
//   ClickRatingEvent,
//   Target,
//   SearchProps,
//   ItemProps,
//   DataProps,
// };
