import React from "react";
import { useGetUsers } from "../../service/query/useGetUsers";
import { Button, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteUsers } from "../../service/mutation/useDeleteUsers";
import { useEditUsers } from "../../service/mutation/useEditUsers";

export const Home = () => {
    const { data, isLoading, error } = useGetUsers();
    const {mutate} = useDeleteUsers();
    const {mutate: edit} = useEditUsers();
    const navigate = useNavigate();

    const deleteUser = (id) => {
        console.log(id);
        mutate(id, {
            onSuccess: () => {
                message.success("Muvaffaqiyatli o'chirildi")
            }
        })
    };

    const editUser = (id) => {
        // Prompt orqali o'zgartirishlar uchun so'rov
        const newName = prompt("Enter new name",);
        const newLastName = prompt("Enter new last name");
        const newAge = prompt("Enter new age");
    
        // Agar foydalanuvchi ma'lumotlarni kiritgan bo'lsa, edit funksiyasini chaqiramiz
        if (newName && newLastName && newAge) {
          // Ma'lumotlarni to'ldirib edit qilish
          edit(
            { id, data: { name: newName, lastName: newLastName, age: newAge } },
            {
              onSuccess: () => {
                message.success("User updated successfully!");
              },
              onError: () => {
                message.error("Error updating user.");
              },
            }
          );
        }
      };
    const handleCreate = () => {
        navigate("/app/create"); 
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastname",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="buttons">
                    <Button onClick={() => deleteUser(record.id)}
                        style={{
                            color: "white",
                            backgroundColor: "red",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        Delete
                    </Button>
                        <Button onClick={() => editUser()}
                            style={{
                                color: "white",
                                backgroundColor: "green",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                            }}
                        >
                            Edit
                        </Button>
                </div>
            ),
        },
    ];

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;

    return (
        <main>
            <div className="container">
                <h1 style={{marginBottom: "20px"}}>Users List</h1>
                    <Button onClick={() => handleCreate()} style={{ marginBottom: "20px" }} type="primary">
                        Create +
                    </Button>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey={(record) => record.id} // Backenddagi `id` qiymati
                />
            </div>
        </main>
    );
};
