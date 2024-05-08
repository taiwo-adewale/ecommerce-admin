interface Props {
  totalPages: number;
  currentPage: number;
}

/**
 * Generates an array of pagination buttons based on the total number of pages and the current page.
 * @param props - Object containing totalPages and currentPage.
 * @param props.totalPages - The total number of pages.
 * @param props.currentPage - The current page.
 * @returns An array of pagination buttons.
 */

export const getPaginationButtons = ({ totalPages, currentPage }: Props) => {
  const paginationButtons: (number | "...")[] = [];

  // Total pages less than 8 pages
  if (totalPages < 8) {
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(i);
    }

    return paginationButtons;
  }

  // Current page in first 5 pages
  if (currentPage < 5) {
    for (let i = 1; i < 6; i++) {
      paginationButtons.push(i);
    }

    paginationButtons.push("...");
    paginationButtons.push(totalPages);

    return paginationButtons;
  }

  // Current page in last five pages
  if (totalPages - currentPage < 4) {
    paginationButtons.push(1);
    paginationButtons.push("...");

    for (let i = totalPages - 4; i <= totalPages; i++) {
      paginationButtons.push(i);
    }

    return paginationButtons;
  }

  // Current page not in first or last five pages
  paginationButtons.push(1);
  paginationButtons.push("...");

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    paginationButtons.push(i);
  }

  paginationButtons.push("...");
  paginationButtons.push(totalPages);

  return paginationButtons;
};
