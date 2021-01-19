
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});




//  https://www.youtube.com/watch?v=8SL_hM1a0yo




// exports.pagination = (req, res) => {
//     try{
//       let page = parseInt(req.query.page);
//       let limit = parseInt(req.query.limit);
    
//       const offset = page ? page * limit : 0;
    
//       Customer.findAndCountAll({ limit: limit, offset:offset })
//         .then(data => {
//           const totalPages = Math.ceil(data.count / limit);
//           const response = {
//             message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
//             data: {
//                 "copyrightby": "https://loizenai.com",
//                 "totalItems": data.count,
//                 "totalPages": totalPages,
//                 "limit": limit,
//                 "currentPageNumber": page + 1,
//                 "currentPageSize": data.rows.length,
//                 "customers": data.rows
//             }
//           };
//           res.send(response);
//         });  
//     }catch(error) {
//       res.status(500).send({
//         message: "Error -> Can NOT complete a paging request!",
//         error: error.message,
//       });
//     }    
//   }

 // https://www.youtube.com/watch?v=9asw2jSi4zE