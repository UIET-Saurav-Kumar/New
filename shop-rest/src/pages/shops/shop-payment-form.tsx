import Input from "@components/ui/input";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "next-i18next";


export default function ShopPaymentForm() {
  
  const { t } = useTranslation("common") ;


    return (


        <form className='flex flex-1' noValidate>

                            <div className="mt-0 w-full h-full p-4 flex-col flex space-y-6">

                                  <Input
                                    label={t("Enter amount")}
                                    type='number'
                                    placeholder=' ₹'
                                    // {...register("name")}
                                    variant="outline"
                                    // error={t(errors.name?.message!)}
                                  />

                                  <TextArea
                                    label={t("Product description")}
                                    // {...register("description")}
                                    variant="outline"
                                    className="-my-2"
                                    rows={2}
                                    // error={t(errors.description?.message!)}
                                  />

                                <Button >
                                  {t("Pay Now")}
                                </Button>

                            </div>

                        </form>
    )
}
