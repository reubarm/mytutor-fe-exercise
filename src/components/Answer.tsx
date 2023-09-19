import styled from "@emotion/styled";

export const Answer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  margin: 4px;
  padding: 1rem;
  background-color: ${(props: { checked: boolean }) =>
    props.checked ? "#ebded5" : "#f2ebe7"};
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    width: calc(50% - 8px);
  }
`;
