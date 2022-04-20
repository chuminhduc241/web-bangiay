import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.scss";

function createData(donHang, ngay, diaChi, giaTri, thanhToan, trangThai) {
  return { donHang, ngay, diaChi, giaTri, thanhToan, trangThai };
}

const rows = [
  createData(
    "May tinh laltop acer c4389",
    "02/02/2033",
    "Ha noi",
    24000000,
    "Qua ngan hang",
    "Đã thanh toán"
  ),
  createData(
    "May tinh laltop acer c4389",
    "02/02/2033",
    "Ha noi",
    24000000,
    "Qua ngan hang",
    "Đã thanh toán"
  ),
];

export default function TableCart() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Đơn hàng</TableCell>
            <TableCell align="left">Ngày</TableCell>
            <TableCell align="left">Địa chỉ</TableCell>
            <TableCell align="center">Giá trị đơn hàng</TableCell>
            <TableCell align="left">Tình trạng thanh toán</TableCell>
            <TableCell align="left">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.donHang}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.donHang}
              </TableCell>
              <TableCell align="left">{row.ngay}</TableCell>
              <TableCell align="left">{row.diaChi}</TableCell>
              <TableCell align="center">{row.giaTri}</TableCell>
              <TableCell align="left">{row.thanhToan}</TableCell>
              <TableCell align="left">{row.trangThai}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
