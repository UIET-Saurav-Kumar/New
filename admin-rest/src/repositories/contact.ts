import { ContactInput, ContactUpdateInput } from "@ts-types/generated";
import Base from "./base";

class Contact extends Base<ContactInput, ContactUpdateInput> {}

export default new Contact();
