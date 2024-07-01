import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
	ActionLeftSection,
	ActionRightSection,
	ActionSection,
	Container,
	FilterSection,
} from "./styles";
import DefaultChipList from "../../../../app/components/chip/defaultChipList";
import theme from "../../../../core/theme/theme";
import { SwitchProductList } from "../../../../app/components/switch/switch";

interface TableHeaderProps {
	mainActionLabel?: string;
	mainIcon?: any;
	mainActionFunction?: () => void;
	mainActionDisabled?: boolean;
	secondaryActionLabel?: string;
	secondaryActionFunction?: () => void;
	switchActionFunction?: () => void;
	filterBtn?: boolean;
	filterBtnAction?: () => void;
	filter?: any;
	remove?: (fiter: string) => void;
	extraComponents?: any;

}

function TableHeader({
	mainActionFunction,
	mainActionLabel,
	extraComponents,
	filterBtn,
	filterBtnAction,
	secondaryActionFunction,
	secondaryActionLabel,
	filter,
	remove,
	mainActionDisabled,
	mainIcon,
	switchActionFunction,
}: Readonly<TableHeaderProps>) {
	return (
		<Container>
			<ActionSection>
				<ActionLeftSection>
					{filterBtn && filterBtnAction && (
						<Tooltip title="Filtros">
							<IconButton
								sx={{ width: 30, height: 30 }}
								onClick={() => filterBtnAction()}
							>
								<FilterListIcon
									sx={{
										fontSize: "20px",
										color: theme.COLORS.YELLOW2,
									}}
								/>
							</IconButton>
						</Tooltip>
					)}
					{extraComponents}

					{switchActionFunction  && (
						<SwitchProductList change={switchActionFunction}/>
					)}
				</ActionLeftSection>
				<ActionRightSection>
					{secondaryActionLabel && secondaryActionFunction && (
						<Button onClick={() => secondaryActionFunction()}>
							{secondaryActionLabel}
						</Button>
					)}
					{mainActionLabel && mainActionFunction && (
						// <Button
						//   disabled={mainActionDisabled}
						//   onClick={() => mainActionFunction()}
						// >
						//   {mainActionLabel}
						// </Button>
						<IconButton
							sx={{
								display: 'flex',
								gap: 1,
								borderRadius: 1,
								'&:hover': {
									borderRadius: 1,
								},
							}}
							onClick={() => mainActionFunction()}
							disabled={mainActionDisabled}
							edge="start"
						>
							{mainIcon}
							<Typography color={theme.COLORS.YELLOW2}>{mainActionLabel}</Typography>
						</IconButton>
					)}
				</ActionRightSection>
			</ActionSection>
			{
				filterBtn && filter && remove && (
					<FilterSection>
						<DefaultChipList filters={filter} onRemoveFitler={remove} />
					</FilterSection>
				)
			}
		</Container >
	);
}

export default TableHeader;
