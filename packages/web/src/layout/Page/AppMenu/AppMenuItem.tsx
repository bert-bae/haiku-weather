import styled from "@emotion/styled";
import { Box, Button, ButtonProps, Typography } from "@mui/material";

const StyledButton = styled(Button)<{ selected: boolean }>`
  width: 100%;
  position: relative;
  padding: ${(props) => props.theme.spacing(2)};
  justify-content: start;
  text-transform: none;
  font-weight: ${({ selected, theme }) =>
    selected
      ? theme.typography.fontWeightBold
      : theme.typography.fontWeightMedium};
  background-color: ${({ selected, theme }) =>
    selected ? theme.palette.primary.main : "white"};
  border-radius: 0;
  color: ${({ selected, theme }) =>
    selected ? "#FFF" : theme.palette.text.primary};
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
  }
`;

interface IExtendedAppMenuItemButtonProps
  extends Omit<ButtonProps, "children"> {
  selected?: boolean;
  title: string;
  subtext?: string;
}

const AppMenuItem = ({
  selected,
  title,
  subtext,
  ...rest
}: IExtendedAppMenuItemButtonProps) => {
  return (
    <StyledButton {...rest} selected={selected} sx={{ boxShadow: 4 }}>
      <Box width="100%">
        <Typography variant="h5" component="p" textAlign="start">
          {title}
        </Typography>
        {subtext && (
          <Typography
            variant="subtitle1"
            component="p"
            marginTop={0.5}
            textAlign={"start"}
          >
            {subtext}
          </Typography>
        )}
      </Box>
    </StyledButton>
  );
};

export default AppMenuItem;
