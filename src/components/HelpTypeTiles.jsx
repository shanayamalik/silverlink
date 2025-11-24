// TODO: Create HelpTypeTiles component for EASY TASK
//
// Props to implement:
// - onSelect: callback function when a tile is selected
// - selectedType: currently selected help type (for highlighting)
//
// Features:
// - Display 3 large, accessible tiles:
//   1. Conversation (use conversation.svg icon)
//   2. Hobby Buddy (use hobby.svg icon)
//   3. Tech Help (use tech-help.svg icon)
// - Each tile should be large (min 150x150px)
// - Clear visual feedback when selected
// - Tap-friendly spacing between tiles
// - Icons should be large and colorful
//
// State management:
// x Save selected type to localStorage when clicked
// x Pass selection to parent component
//
// Example usage:
// <HelpTypeTiles 
//   onSelect={(type) => setHelpType(type)} 
//   selectedType={helpType}
// />
import {useEffect} from 'react';
import "../styles/HelperTypeTiles.css"

const TILE_OPTIONS = [
  { key: "conversational", label:"Conversational", icon: "/icons/conversation.svg"}, 
  { key: "hobby", label:"Hobby", icon: "/icons/hobby.svg"},
  { key: "tech-help", label:"Tech Help", icon: "/icons/tech-help.svg"}
]
export default function HelpTypeTiles({onSelect, selectedType}) {
  // runs only when a tile is selected
  useEffect(() => {
    if (selectedType) {
      // save selection to local storage when the tile is selected
      localStorage.setItem("helpType", selectedType);
    }
  }, [selectedType]);

  return (
    <div className="help-type-container">
      {/** Loop through each tile so can create automatically */}
      {TILE_OPTIONS.map(({ key, label, icon }) => {
        const isSelected = selectedType === key;

        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            aria-pressed={isSelected}
            className={`help-type-tile ${isSelected ? "selected" : ""}`}
          >
            <img
              src={icon}
              alt={label}
              width={64}
              height={64}
              className="help-type-icon"
            />
            <span className="help-type-label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
