"use client";

import { useId, useRef, useState } from "react";

const sortOptions = [
  { label: "Popularité", value: "popularity" },
  { label: "Date", value: "date" },
  { label: "Titre", value: "title" },
];

export default function MediaSort() {
  const labelId = useId();
  const listboxId = useId();
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(sortOptions[0].value);

  const selectedIndex = sortOptions.findIndex(
    (option) => option.value === selectedValue,
  );
  const selectedOption = sortOptions[selectedIndex];

  function selectOption(option) {
    setSelectedValue(option.value);
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function focusOption(index) {
    optionRefs.current[index]?.focus();
  }

  function handleTriggerKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      requestAnimationFrame(() => focusOption(selectedIndex));
    }
  }

  function handleOptionKeyDown(event, index) {
    if (event.key === "Escape") {
      setIsOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption((index + 1) % sortOptions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption((index - 1 + sortOptions.length) % sortOptions.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(sortOptions[index]);
    }
  }

  return (
    <div className="media-sort">
      <span id={labelId} className="media-sort-label">
        Trier par
      </span>
      <div className="media-sort-menu">
        <button
          ref={triggerRef}
          className="media-sort-trigger"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-labelledby={`${labelId} ${listboxId}-trigger`}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          onKeyDown={handleTriggerKeyDown}
        >
          <span id={`${listboxId}-trigger`}>{selectedOption.label}</span>
          <span className="media-sort-arrow" aria-hidden="true" />
        </button>
        {isOpen ? (
          <ul
            id={listboxId}
            className="media-sort-listbox"
            role="listbox"
            aria-labelledby={labelId}
            aria-activedescendant={`${listboxId}-${selectedOption.value}`}
          >
            {sortOptions.map((option, index) => (
              <li
                key={option.value}
                id={`${listboxId}-${option.value}`}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                role="option"
                tabIndex={0}
                aria-selected={option.value === selectedValue}
                onClick={() => selectOption(option)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
