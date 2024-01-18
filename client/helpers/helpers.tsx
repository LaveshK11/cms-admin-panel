import PropertyModel from "@/models/listPropertyModel/PropertiesModel";

export async function display(): Promise<void> {
  try {
    const users = await PropertyModel.findAll({})
    // console.log(users)
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
display();
