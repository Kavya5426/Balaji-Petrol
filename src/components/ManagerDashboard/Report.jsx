import React, { useState } from "react";
import "../../styling/Report.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } from "docx";

const Report = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData] = useState([
    { phone: "9876543210", custId: "C001", cardNo: "CARD001", name: "Alice", points: 1200, gifts: 5, consumed: 1000 },
    { phone: "8765432109", custId: "C002", cardNo: "CARD002", name: "Bob", points: 900, gifts: 3, consumed: 600 },
    { phone: "7654321098", custId: "C003", cardNo: "CARD003", name: "Charlie", points: 800, gifts: 2, consumed: 400 },
  ]);

  const [exportType, setExportType] = useState("");

  const filteredData = sortedData.filter(
    (item) =>
      item.phone.includes(searchTerm) ||
      item.custId.includes(searchTerm) ||
      item.cardNo.includes(searchTerm) ||
      item.name.includes(searchTerm)
  );

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Customer Report", 14, 10);
    doc.autoTable({
      head: [["Phone Number", "Customer ID", "Card Number", "Customer Name", "Points", "Gifts Redeemed", "Points Consumed"]],
      body: filteredData.map((item) => [
        item.phone,
        item.custId,
        item.cardNo,
        item.name,
        item.points,
        item.gifts,
        item.consumed,
      ]),
    });
    doc.save("report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "report.xlsx");
  };

  // Export as Word
  const exportWord = () => {
    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph("Phone Number")] }),
            new TableCell({ children: [new Paragraph("Customer ID")] }),
            new TableCell({ children: [new Paragraph("Card Number")] }),
            new TableCell({ children: [new Paragraph("Customer Name")] }),
            new TableCell({ children: [new Paragraph("Points")] }),
            new TableCell({ children: [new Paragraph("Gifts Redeemed")] }),
            new TableCell({ children: [new Paragraph("Points Consumed")] }),
          ],
        }),
        ...filteredData.map(
          (item) =>
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph(item.phone)] }),
                new TableCell({ children: [new Paragraph(item.custId)] }),
                new TableCell({ children: [new Paragraph(item.cardNo)] }),
                new TableCell({ children: [new Paragraph(item.name)] }),
                new TableCell({ children: [new Paragraph(item.points.toString())] }),
                new TableCell({ children: [new Paragraph(item.gifts.toString())] }),
                new TableCell({ children: [new Paragraph(item.consumed.toString())] }),
              ],
            })
        ),
      ],
      width: { size: 100, type: WidthType.PERCENTAGE },
    });

    const doc = new Document({
      sections: [
        {
          children: [new Paragraph("Customer Report"), table],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "report.docx");
    });
  };

  // Handle Export Selection
  const handleExport = (type) => {
    if (type === "PDF") exportPDF();
    if (type === "Excel") exportExcel();
    if (type === "Word") exportWord();
  };

  return (
    <div className="report-section">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Phone, Customer ID,name, or Card Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Export Button with Dropdown */}
      <div className="export-dropdown">
        <button
          onClick={() => setExportType((prev) => (prev ? "" : "open"))}
          className="export-button"
        >
          Export
        </button>
        {exportType === "open" && (
          <div className="dropdown-menu">
            <button onClick={() => handleExport("PDF")}>Export as PDF</button>
            <button onClick={() => handleExport("Excel")}>Export as Excel</button>
            <button onClick={() => handleExport("Word")}>Export as Word</button>
          </div>
        )}
      </div>

      {/* Scrollable Table */}
      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Customer ID</th>
              <th>Card Number</th>
              <th>Customer Name</th>
              <th>Points</th>
              <th>Gifts Redeemed</th>
              <th>Points Consumed</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.phone}</td>
                <td>{item.custId}</td>
                <td>{item.cardNo}</td>
                <td>{item.name}</td>
                <td>{item.points}</td>
                <td>{item.gifts}</td>
                <td>{item.consumed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
