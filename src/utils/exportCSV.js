// One job: take the controls array and download it as a CSV file

export function exportToCSV(controls) {
    const headers = [
        "ID",
        "Family",
        "Title",
        "Status",
        "Note",
        "Evidence Reference",
        "Last Updated",
    ];

    const rows = controls.map((control) => [
        control.id,
        control.family,
        control.title,
        control.status,
        `"${(control.note || "").replace(/"/g, '""')}"`,
        `"${(control.evidenceRef || "").replace(/"/g, '""')}"`,
        control.lastUpdated || "",
    ]);

    const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nist-controls-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    // Release memory after download starts
    URL.revokeObjectURL(url);
}