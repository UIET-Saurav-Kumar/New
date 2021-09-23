import Input from "@components/ui/input";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "next-i18next";
import { useState } from "react";



export default function DeliveryAddressInputs() {
  const { t } = useTranslation("common") ;
  const [rider, setRider] = useState(false);



    return (


        <form className='flex flex-1' noValidate>

                            <div className="mt-0 w-full  h-full p-4 flex-col flex space-y-6">

                                  <Input
                                    // label={t("Enter amount")}
                                    
                                    placeholder='Pickup location'
                                    // {...register("name")}
                                    variant="outline"
                                    // error={t(errors.name?.message!)}
                                  />

                                  <Input
                                    // label={t("Product description")}
                                    // {...register("description")}
                                    placeholder='Drop location'
                                    variant="outline"
                                    className="-my-2"
                                    rows={2}
                                    // error={t(errors.description?.message!)}
                                  />

                                <Button>
                                  {t("Book Delivery")}
                                </Button>

                            </div>

                        </form>
    )
}
