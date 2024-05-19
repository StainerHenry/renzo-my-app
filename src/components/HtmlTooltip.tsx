import { Tooltip, TooltipProps } from "@mui/material";

const HtmlTooltip = (props: TooltipProps) => {
	const { className } = props
	return (
		<Tooltip {...props} classes={{ popper: className }} />
	)
}

export default HtmlTooltip;