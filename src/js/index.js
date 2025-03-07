document.getElementById("btnBanh").addEventListener("click", function() {
    document.getElementById("bangBanh").classList.remove("hidden");
    document.getElementById("bangNen").classList.add("hidden");
});

document.getElementById("btnNen").addEventListener("click", function() {
    document.getElementById("bangNen").classList.remove("hidden");
    document.getElementById("bangBanh").classList.add("hidden");
});
// Xử lý Hành Đọng trong phần quản lý sản phẩm 
document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("editForm");
    const editName = document.getElementById("editName");
    const editPrice = document.getElementById("editPrice");
    const editPrice_KM = document.getElementById("editPrice_KM");
    const editImageInput = document.getElementById("editImageInput");
    const editImagePreview = document.getElementById("editImagePreview");
    const updateBtn = document.getElementById("updateBtn");
    let currentRow = null;
    let currentImage = null;

    // Xử lý khi bấm "Chỉnh sửa"
    document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Ngăn load lại trang

            const row = this.closest("tr");
            const nameCell = row.cells[1].textContent;
            const priceCell = row.cells[4].textContent;
            const priceCell_KM = row.cells[5].textContent;
            const imageCell = row.cells[0].querySelector("img"); // Lấy thẻ <img>

            editName.value = nameCell;
            editPrice.value = priceCell;
            editPrice_KM.value = priceCell_KM;
            editImagePreview.src = imageCell.src; // Hiển thị ảnh hiện tại
            currentRow = row;
            currentImage = imageCell; // Lưu ảnh hiện tại để cập nhật

            editForm.classList.remove("hidden"); // Hiện form chỉnh sửa
        });
    });

    // Xử lý khi chọn ảnh mới
    editImageInput.addEventListener("change", function () {
        const file = editImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                editImagePreview.src = e.target.result; // Hiển thị ảnh mới trong form
            };
            reader.readAsDataURL(file);
        }
    });

    // Cập nhật sản phẩm sau khi chỉnh sửa
    updateBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn load lại trang

        if (currentRow) {
            currentRow.cells[1].textContent = editName.value;
            currentRow.cells[4].textContent = editPrice.value;
            currentRow.cells[5].textContent = editPrice_KM.value;

            // Cập nhật ảnh nếu có thay đổi
            if (editImageInput.files.length > 0) {
                currentImage.src = editImagePreview.src;
            }
        }

        editForm.classList.add("hidden"); // Ẩn form sau khi cập nhật
    });

    // Xoá sản phẩm khi bấm "Xoá"
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Ngăn load lại trang
            this.closest("tr").remove();
        });
    });


});


// Xử lý nút mở thêm sản phẩm
document.addEventListener("DOMContentLoaded", function () {
    const openFormBtn = document.getElementById("openFormBtn1");
    const closeFormBtn = document.getElementById("closeFormBtn1");
    const productForm = document.getElementById("productForm");
    const addProductBtn = document.getElementById("addProductBtn");

    const productImageInput = document.getElementById("productImageInput");
    const productImagePreview = document.getElementById("productImagePreview");
    const productName = document.getElementById("productName");
    const soldQuantity = document.getElementById("soldQuantity");
    const remainingQuantity = document.getElementById("remainingQuantity");
    const productPrice = document.getElementById("productPrice");
    const discountPrice = document.getElementById("discountPrice");
    const productDescription = document.getElementById("productDescription");

    const productTable = document.getElementById("productTable").querySelector("tbody");

    // Mở form
    openFormBtn.addEventListener("click", function () {
        productForm.classList.remove("hidden");
    });

    // Đóng form
    closeFormBtn.addEventListener("click", function () {
        productForm.classList.add("hidden");
    });

    // Xem trước ảnh
    productImageInput.addEventListener("change", function () {
        const file = productImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                productImagePreview.src = e.target.result;
                productImagePreview.classList.remove("hidden");
            };
            reader.readAsDataURL(file);
        }
    });

    // Thêm sản phẩm vào bảng
    addProductBtn.addEventListener("click", function () {
        const imageSrc = productImagePreview.src;
        const name = productName.value.trim();
        const sold = soldQuantity.value.trim();
        const remaining = remainingQuantity.value.trim();
        const price = productPrice.value.trim();
        const discount = discountPrice.value.trim();
        const description = productDescription.value.trim();

        if (!name || !price || !remaining) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="px-4 py-2"><img src="${imageSrc}" class="w-16 md:w-32 max-w-full max-h-full"></td>
            <td class="px-4 py-2">${name}</td>
            <td class="px-4 py-2">${sold}</td>
            <td class="px-4 py-2">${remaining}</td>
            <td class="px-4 py-2">${price}</td>
            <td class="px-4 py-2">${discount}</td>
            <td class="px-4 py-2">${description}</td>
            <td class="px-4 py-2">
                <div class="">
                                            <a href="">
                                                <button id="" type="button" class="edit-btn text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-thin rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                                                    Chỉnh sửa
                                                    </button>
                                            </a>
                                            <a href="">
                                                <button type="button" class="delete-btn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-thin rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Xoá sản phẩm </button>
                                            </a>
                                        </div>
            </td>
        `;

        productTable.appendChild(newRow);

        // Xóa sản phẩm
        newRow.querySelector(".delete-btn").addEventListener("click", function () {
            newRow.remove();
        });

        // Reset form
        productImageInput.value = "";
        productImagePreview.src = "";
        productImagePreview.classList.add("hidden");
        productName.value = "";
        soldQuantity.value = "";
        remainingQuantity.value = "";
        productPrice.value = "";
        discountPrice.value = "";
        productDescription.value = "";

        productForm.classList.add("hidden"); // Đóng popup sau khi thêm
    });
});
// ===================///NHÂN VIÊN///======================//
// Xử lý lọc theo vị trí
document.getElementById("filterPosition").addEventListener("change", function () {
    const selectedPosition = this.value;
    const rows = document.querySelectorAll(".employee-row");
    let hasEmployee = false;

    rows.forEach(row => {
        const position = row.getAttribute("data-position");

        if (selectedPosition === "all" || position === selectedPosition) {
            row.style.display = "";
            hasEmployee = true;
        } else {
            row.style.display = "none";
        }
    });

    // Kiểm tra nếu không có nhân viên nào, hiển thị thông báo
    const tableBody = document.getElementById("employeeTable");
    let noDataRow = document.getElementById("noDataRow");

    if (!hasEmployee) {
        if (!noDataRow) {
            noDataRow = document.createElement("tr");
            noDataRow.id = "noDataRow";
            noDataRow.innerHTML = `<td colspan="7" class="text-center py-4 text-gray-500">Không có nhân viên nào ở vị trí này.</td>`;
            tableBody.appendChild(noDataRow);
        }
    } else {
        if (noDataRow) {
            noDataRow.remove();
        }
    }
});

// THỐNG KÊ
document.addEventListener("DOMContentLoaded", function() {
    let months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    
    let barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Bánh bán ra',
                data: [120, 150, 180, 200, 170, 190, 220, 240, 260, 280, 300, 320],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 500 // Giảm thời gian animation để tăng tốc
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    let pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Khách hàng mới', 'Khách hàng quay lại'],
            datasets: [{
                label: 'Số lượng khách hàng',
                data: [60, 40],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 300 // Giảm thời gian animation cho nhanh hơn
            }
        }
    });
    
    let lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Lượt truy cập',
                data: [500, 700, 1000, 1200, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300],
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 500 // Giảm thời gian animation
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// Thêm nhân viên
document.addEventListener("DOMContentLoaded", function () {
    // Mở form popup khi nhấn vào nút "Thêm nhân viên"
    document.getElementById('openFormBtn').addEventListener('click', function () {
        document.getElementById('employeeFormPopup').classList.remove('hidden');
    });

    // Đóng form popup khi nhấn "Hủy"
    document.getElementById('closeFormBtn').addEventListener('click', function () {
        document.getElementById('employeeFormPopup').classList.add('hidden');
    });

    // Xử lý thêm nhân viên vào bảng
    document.getElementById('employeeForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('employeeName').value;
        const dob = document.getElementById('dob').value;
        const cccd = document.getElementById('cccd').value;
        const phone = document.getElementById('phone').value;
        const position = document.getElementById('position').value;
        const imageInput = document.getElementById('employeeImage');

        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const imageSrc = e.target.result;

                const table = document.getElementById('employeeTable');
                const row = document.createElement('tr');
                row.classList.add('bg-white', 'border-b', 'border-gray-200', 'hover:bg-gray-50', 'employee-row');
                row.setAttribute('data-position', position);

                row.innerHTML = `
                    <td class="p-4"><img src="${imageSrc}" class="w-16 md:w-32 max-w-full max-h-full" alt="Employee Image"></td>
                    <td class="px-6 py-4 font-thin text-gray-900">${name}</td>
                    <td class="px-6 py-4 font-thin text-gray-900">${dob}</td>
                    <td class="px-6 py-4 font-thin text-gray-900">${cccd}</td>
                    <td class="px-6 py-4 font-thin text-gray-900">${phone}</td>
                    <td class="px-6 py-4 font-thin text-gray-900">${position}</td>
                    <td class="px-6 py-4">
                                    <div>
                                        <button type="button" class="focus:outline-none edit-btn text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Chỉnh sửa</button>
                                        <button type="button" class="focus:outline-none delete-btn text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Xoá nhân viên</button>
                                        
                                    </div>
                                </td>
                `;

                table.appendChild(row);
                document.getElementById('employeeFormPopup').classList.add('hidden');
                document.getElementById('employeeForm').reset();
            };

            reader.readAsDataURL(file);
        } else {
            alert("Vui lòng chọn hình ảnh!");
        }
    });

});

// Xử lý chỉnh sửa và xoá nhân viên 
document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById('employeeTable');
    const editForm = document.getElementById('editEmployeeForm');
    let currentEditingRow = null; // Biến lưu hàng đang chỉnh sửa

    // XỬ LÝ CHỈNH SỬA NHÂN VIÊN
    table.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const cells = row.getElementsByTagName('td');

            if (!row || cells.length < 6) {
                console.error("Không tìm thấy dữ liệu dòng để chỉnh sửa.");
                return;
            }

            // Lưu hàng hiện tại vào biến toàn cục
            currentEditingRow = row;

            // Điền dữ liệu vào form
            document.getElementById('editEmployeeName').value = cells[1].innerText.trim();
            document.getElementById('editDob').value = cells[2].innerText.trim();
            document.getElementById('editCccd').value = cells[3].innerText.trim();
            document.getElementById('editPhone').value = cells[4].innerText.trim();
            document.getElementById('editPosition').value = cells[5].innerText.trim();

            // Hiển thị popup chỉnh sửa
            document.getElementById('editEmployeePopup').classList.remove('hidden');
        }
    });

    // ĐÓNG POPUP CHỈNH SỬA
    document.getElementById('closeEditPopup').addEventListener('click', function () {
        document.getElementById('editEmployeePopup').classList.add('hidden');
    });

    // CẬP NHẬT NHÂN VIÊN SAU KHI CHỈNH SỬA
    editForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn reload trang

        if (!currentEditingRow) {
            console.error("Không tìm thấy hàng để cập nhật.");
            return;
        }

        const cells = currentEditingRow.getElementsByTagName('td');

        // Cập nhật dữ liệu
        cells[1].innerText = document.getElementById('editEmployeeName').value;
        cells[2].innerText = document.getElementById('editDob').value;
        cells[3].innerText = document.getElementById('editCccd').value;
        cells[4].innerText = document.getElementById('editPhone').value;
        cells[5].innerText = document.getElementById('editPosition').value;

        // Cập nhật hình ảnh nếu có thay đổi
        const imageInput = document.getElementById('editEmployeeImage');
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                cells[0].querySelector('img').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        // Ẩn popup chỉnh sửa
        document.getElementById('editEmployeePopup').classList.add('hidden');
    });
});
// ===================///KHÁCH HÀNG///======================//
// LỌC KHÁCH HÀNG
document.getElementById("filterPosition_KH").addEventListener("change", function () {
    const selectedPosition = this.value;
    const rows = document.querySelectorAll("#KhachHangTable tr");
    let hasCustomer = false;

    rows.forEach(row => {
        const positionCell = row.querySelector("td:nth-child(6)"); // Cột thứ 6 là loại khách hàng
        if (positionCell) {
            const position = positionCell.textContent.trim();
            if (selectedPosition === "all" || position === selectedPosition) {
                row.style.display = "";
                hasCustomer = true;
            } else {
                row.style.display = "none";
            }
        }
    });

    // Kiểm tra nếu không có khách hàng nào, hiển thị thông báo
    const tableBody = document.getElementById("KhachHangTable");
    let noDataRow = document.getElementById("noDataRow");

    if (!hasCustomer) {
        if (!noDataRow) {
            noDataRow = document.createElement("tr");
            noDataRow.id = "noDataRow";
            noDataRow.innerHTML = `<td colspan="7" class="text-center py-4 text-gray-500">Không có khách hàng nào.</td>`;
            tableBody.appendChild(noDataRow);
        }
    } else {
        if (noDataRow) {
            noDataRow.remove();
        }
    }
});

// Chỉnh sửa Khách Hàng 
document.addEventListener("DOMContentLoaded", function () {
    const customerTable = document.getElementById('KhachHangTable');
    const editCustomerForm = document.getElementById('editEmployeeForm_KH');
    let currentEditingRow = null;

    // XỬ LÝ CHỈNH SỬA KHÁCH HÀNG
    customerTable.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit_KH')) {
            const row = event.target.closest('tr');
            const cells = row.getElementsByTagName('td');

            if (!row || cells.length < 6) {
                console.error("Không tìm thấy dữ liệu dòng để chỉnh sửa.");
                return;
            }

            currentEditingRow = row;

            document.getElementById('editTen').value = cells[0].innerText.trim();
            document.getElementById('editCCCD').value = cells[1].innerText.trim();
            document.getElementById('editDob1').value = cells[2].innerText.trim();
            document.getElementById('editDiaChi').value = cells[3].innerText.trim();
            document.getElementById('editPhone1').value = cells[4].innerText.trim();
            document.getElementById('editPosition_KH').value = cells[5].innerText.trim();

            document.getElementById('editEmployeePopup_KH').classList.remove('hidden');
        }
    });

    document.getElementById('closeEditPopup1').addEventListener('click', function () {
        document.getElementById('editEmployeePopup_KH').classList.add('hidden');
    });

    editCustomerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!currentEditingRow) {
            console.error("Không tìm thấy hàng để cập nhật.");
            return;
        }

        const cells = currentEditingRow.getElementsByTagName('td');

        cells[0].innerText = document.getElementById('editTen').value;
        cells[1].innerText = document.getElementById('editCCCD').value;
        cells[2].innerText = document.getElementById('editDob1').value;
        cells[3].innerText = document.getElementById('editDiaChi').value;
        cells[4].innerText = document.getElementById('editPhone1').value;
        cells[5].innerText = document.getElementById('editPosition_KH').value;

        document.getElementById('editEmployeePopup_KH').classList.add('hidden');
    });

    // XÓA KHÁCH HÀNG
    customerTable.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-KH')) {
            const row = event.target.closest('tr');
            if (confirm("Bạn có chắc chắn muốn xoá khách hàng này?")) {
                row.remove();
            }
        }
    });
});
// Xử lý tìm kiếm sản phẩm 
document.getElementById("searchProductBtn").addEventListener("click", function () {
    const searchValue = document.getElementById("searchProductInput").value.toLowerCase().trim();
    const productRows = document.querySelectorAll("#banhTableBody tr");

    productRows.forEach(row => {
        const productNameCell = row.querySelector("td:nth-child(2)"); // Cột chứa tên sản phẩm
        if (productNameCell) {
            const productName = productNameCell.textContent.toLowerCase();
            if (productName.includes(searchValue)) {
                row.style.display = ""; // Hiển thị dòng sản phẩm nếu tìm thấy
            } else {
                row.style.display = "none"; // Ẩn dòng nếu không khớp
            }
        }
    });
});
// Xử lý nút lọc đơn hàng
document.getElementById('dateFilter').addEventListener('change', filterOrders);
    document.getElementById('statusFilter').addEventListener('change', filterOrders);

    function filterOrders() {
        const dateFilter = document.getElementById('dateFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const rows = document.querySelectorAll('#orderTableBody tr');
        let totalAmount = 0;
        
        const now = new Date();
        rows.forEach(row => {
            const orderDate = new Date(row.dataset.date);
            const status = row.dataset.status;
            const total = parseInt(row.dataset.total);
            
            let show = true;
            if (dateFilter === '30') {
                const diffTime = Math.abs(now - orderDate);
                const diffDays = diffTime / (1000 * 60 * 60 * 24);
                show = diffDays <= 30;
            }
            if (statusFilter !== 'all' && status !== statusFilter) {
                show = false;
            }
            row.style.display = show ? '' : 'none';
            if (show) totalAmount += total;
        });
        document.getElementById('totalAmount').textContent = `Tổng tiền: ${totalAmount.toLocaleString()} VND`;
    }