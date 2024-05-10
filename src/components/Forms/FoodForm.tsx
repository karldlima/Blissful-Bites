import { useState } from "react";

interface FoodFormProps<T> {
  onSubmit: (_formData: T) => void;
}

const FoodForm = <T,>({ onSubmit }: FoodFormProps<T>): JSX.Element => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    topping: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as T);
    setFormData({ id: "", name: "", type: "", topping: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID"
        name="id"
        value={formData.id}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Topping"
        name="topping"
        value={formData.topping}
        onChange={handleChange}
      />
      <button type="submit">Add Food</button>
    </form>
  );
};

export default FoodForm;
