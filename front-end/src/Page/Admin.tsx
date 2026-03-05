import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Modal,
  Input,
  Select,
  DatePicker,
} from "antd";
import type { TableColumnsType } from "antd";
import { PagepathAPI } from "../Router/Path";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

interface DataType {
  uid: string;
  email: string;
  name: string;
  lastname: string;
  gender: string;
  birthday: string;
  login_from: string;
  role: string;
}

const Admin = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  // 🟢 MODAL STATE
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  // 🔄 GET ALL USERS
  const getAllUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(PagepathAPI.GetAllUser);
      const data = await res.json();

      if (data.status === 200) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
      message.error("โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  // ✏️ EDIT → OPEN MODAL
  const handleEdit = (record: DataType) => {
    setSelectedUser(record);
    setOpen(true);
  };

  // 💾 SAVE EDIT
  const handleSave = async () => {
    if (!selectedUser) return;

    try {
      await fetch(`${PagepathAPI.GetAllUser}/${selectedUser.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedUser.name,
          lastname: selectedUser.lastname,
          gender: selectedUser.gender,
          birthday: selectedUser.birthday,
          role: selectedUser.role,
        }),
      });

      message.success("อัปเดตข้อมูลสำเร็จ");
      setOpen(false);
      setSelectedUser(null);
      getAllUser(); // 🔄 refresh
    } catch (err) {
      console.error(err);
      message.error("อัปเดตไม่สำเร็จ");
    }
  };

  // ❌ DELETE
  const handleDelete = async (record: DataType) => {
    try {
      await fetch(`${PagepathAPI.GetAllUser}/${record.uid}`, {
        method: "DELETE",
      });
      message.success("ลบผู้ใช้เรียบร้อย");
      getAllUser();
    } catch (err) {
      console.error(err);
      message.error("ลบไม่สำเร็จ");
    }
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Email", dataIndex: "email" },
    { title: "Name", dataIndex: "name" },
    { title: "Last name", dataIndex: "lastname" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Birthday", dataIndex: "birthday" },
    { title: "Login From", dataIndex: "login_from" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            EDIT
          </Button>

          <Popconfirm
            title="ยืนยันการลบ?"
            description="ข้อมูลนี้จะถูกลบถาวร"
            onConfirm={() => handleDelete(record)}
            okText="ลบ"
            cancelText="ยกเลิก"
          >
            <Button danger>DEL</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-8">Admin Dashboard</h1>

      <Table<DataType>
        rowKey="uid"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* 🟢 MODAL EDIT */}
      <Modal
        title="Edit User"
        open={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Input
          placeholder="Name"
          value={selectedUser?.name}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser!, name: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Name"
          value={selectedUser?.lastname}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser!, name: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />

        <Select
          value={selectedUser?.gender}
          style={{ width: "100%", marginBottom: 10 }}
          onChange={(v) => setSelectedUser({ ...selectedUser!, gender: v })}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <DatePicker
          style={{ width: "100%", marginBottom: 10 }}
          value={selectedUser?.birthday ? dayjs(selectedUser.birthday) : null}
          onChange={(date) =>
            setSelectedUser({
              ...selectedUser!,
              birthday: date ? date.format("YYYY-MM-DD") : "",
            })
          }
        />
        <Select
          value={selectedUser?.role}
          style={{ width: "100%" }}
          onChange={(v) => setSelectedUser({ ...selectedUser!, role: v })}
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Admin;
