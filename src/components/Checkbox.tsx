import styled from "@emotion/styled";

export const Checkbox = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 10px;
  border: 2px solid #4a4a4a;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;

  ${(props: { checked: boolean; type: "checkbox" | "radio" }) =>
    props.checked ? "background-color: #b4481b; border-color: #b4481b;" : ""};
`;
