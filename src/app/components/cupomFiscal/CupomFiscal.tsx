import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from "@mui/material";

import "./style.css";
import {RootState} from "../../../core/redux/store";
import {formatCurrencyBR} from "../../../core/utils/globalFunctions";

export const CupomFiscal = () => {
    const {
        list,
        paymentToSale,
        percentageDiscount,
        fixedDiscount,
        salePriceType
    } = useSelector((state: RootState) => state.sale);

    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    const totalValue = list.reduce(
        (acc, item) =>
            salePriceType === "REVENDA"
                ? acc + (item.priceTag ?? 0) * item.quantity
                : acc + (item.resalePrice ?? 0) * item.quantity,
        0
    );

    const discountedValue = percentageDiscount > 0
        ? totalValue * (1 - percentageDiscount / 100)
        : totalValue - fixedDiscount;

    const totalPaid = paymentToSale.reduce((acc, item) => acc + (item.value ?? 0), 0);

    return (
        <Box className="printer-ticket" sx={{
            display: 'table',
            width: '100%',
            maxWidth: '400px',
            fontWeight: 'light',
            lineHeight: '1.3em',
            fontFamily: 'Tahoma, Geneva, sans-serif',
            fontSize: '10px',
            '& *': { fontFamily: 'Tahoma, Geneva, sans-serif' }
        }}>
            <thead>
            <tr>
                <th className="title" colSpan={3}>Victor Shop</th>
            </tr>
            <tr>
                <th colSpan={3}>{formattedDate} - {formattedTime}</th>
            </tr>
            <tr>
                <th colSpan={3}>Nome do cliente <br /> 000.000.000-00</th>
            </tr>
            <tr>
                <th className="ttu" colSpan={3}><b>Cupom não fiscal</b></th>
            </tr>
            </thead>
            <tbody>
            {list.map((item, index) => (
                <React.Fragment key={index}>
                    <tr className="top">
                        <td colSpan={3}>{item.productName}</td>
                    </tr>
                    <tr>
                        <td>{formatCurrencyBR(item.priceTag ?? item.resalePrice)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatCurrencyBR((item.priceTag! ?? item.resalePrice!) * item.quantity)}</td>
                    </tr>
                    {/*{item.caracteristicsRequest.map(caracteristic => (*/}
                    {/*    <tr key={caracteristic.id}>*/}
                    {/*        <td colSpan={3}>{caracteristic.}</td>*/}
                    {/*    </tr>*/}
                    {/*))}*/}
                </React.Fragment>
            ))}
            </tbody>
            <tfoot>
            <tr className="sup ttu p--0">
                <td colSpan={3}><b>Totais</b></td>
            </tr>
            <tr className="ttu">
                <td colSpan={2}>Sub-total</td>
                <td align="right">{formatCurrencyBR(totalValue)}</td>
            </tr>
            <tr className="ttu">
                <td colSpan={2}>Desconto</td>
                <td align="right">{percentageDiscount > 0 ? `${percentageDiscount}%` : formatCurrencyBR(fixedDiscount)}</td>
            </tr>
            <tr className="ttu">
                <td colSpan={2}>Total</td>
                <td align="right">{formatCurrencyBR(discountedValue)}</td>
            </tr>
            <tr className="sup ttu p--0">
                <td colSpan={3}><b>Pagamentos</b></td>
            </tr>
            {paymentToSale.map((payment, index) => (
                <tr className="ttu" key={index}>
                    <td colSpan={2}>{payment.name}</td>
                    <td align="right">{formatCurrencyBR(payment.value)}</td>
                </tr>
            ))}
            <tr className="ttu">
                <td colSpan={2}>Total pago</td>
                <td align="right">{formatCurrencyBR(totalPaid)}</td>
            </tr>
            <tr className="ttu">
                <td colSpan={2}>Troco</td>
                <td align="right">{formatCurrencyBR(totalPaid - discountedValue)}</td>
            </tr>
            <tr className="sup">
                <td colSpan={3} align="center"><b>Pedido:</b></td>
            </tr>
            <tr className="sup">
                <td colSpan={3} align="center">www.site.com</td>
            </tr>
            </tfoot>
        </Box>
    );
};