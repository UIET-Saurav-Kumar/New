import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import Button from '@components/ui/button';
import { useModalState } from '@components/ui/modal/modal.context';
import { Form } from '@components/ui/form';
import Image  from 'next/image';
import FileInput from '@components/ui/file-input';
import RateInput from '@components/ui/rate-input';
import Label from '@components/ui/label';
import TextArea from '@components/ui/text-area';
import { useCreateReview, useUpdateReview } from '@utils/review';
import { CreateReviewInput } from '@ts-types/custom.types';

const reviewFormSchema = yup.object().shape({
  rating: yup.number().required('error-rating-required'),
  comment: yup.string(),
  photos: yup.array(),
});

export default function ReviewForm() {
  
  const { t } = useTranslation('common');
  const { data } = useModalState();
  const { createReview, isLoading: creating } = useCreateReview();

  const { updateReview, isLoading } = useUpdateReview();

  const onSubmit = (
    values: Omit<
      CreateReviewInput,
      'product_id' | 'shop_id' | 'order_id' | 'variation_option_id'
    >
  ) => {
    if (data?.my_review) {
      // @ts-ignore
      updateReview({
        ...values,
        photos: values?.photos?.map(({ __typename, ...rest }) => rest),
        id: data?.my_review.id,
        order_id: data?.order_id,
        variation_option_id: data?.variation_option_id,
      });
      return;
    }
    // @ts-ignore
    createReview({
      ...values,
      product_id: data?.product_id,
      shop_id: data?.shop_id,
      order_id: data?.order_id,
      variation_option_id: data?.variation_option_id,
    });
  };
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light md:h-auto md:min-h-0 md:max-w-[590px] md:rounded-xl">
      <div className="flex items-center border-b border-border-200 p-7">
        <div className="flex shrink-0">
             < Image        quality='40'
            src={data?.image?.thumbnail ?? '/'}
            alt={data?.name}
            width={90}
            height={90}
            className="inline-flex rounded bg-gray-200"
          />
        </div>
        <div className="ltr:pl-6 rtl:pr-6">
          <h3 className="mb-2 text-base font-semibold leading-[1.65em] text-heading">
            {data?.name}
          </h3>
        </div>
      </div>
      <div className="p-7">
        <Form<Omit<CreateReviewInput, 'product_id' | 'shop_id' | 'variation_option_id' | 'order_id'>>
          onSubmit={onSubmit}
          validationSchema={reviewFormSchema}
          useFormProps={{
            defaultValues: {
              rating: data?.my_review?.rating ?? 0,
              comment: data?.my_review?.comment ?? '',
              photos: data?.my_review?.photos ?? [],
            },
          }}
        >
          {({ register, control, formState: { errors } }) => (
            <>
              <div className="mb-5">
                <Label className="mb-2">{t('text-give-ratings')}</Label>
                <div className="w-auto">
                  <RateInput
                    control={control}
                    name="rating"
                    defaultValue={0}
                    style={{ fontSize: 30 }}
                    allowClear={false}
                  />
                </div>
              </div>

              <TextArea
                label={t('text-description')}
                {...register('comment')}
                variant="outline"
                className="mb-5"
                error={t(errors.comment?.message!)}
              />

              <div className="mb-8">
                <Label htmlFor="photos">{t('text-upload-images')}</Label>
                <FileInput control={control} name="photos" multiple={true} />
              </div>

              <div className="mt-8">
                <Button
                  className="h-11 w-full sm:h-12"
                  loading={isLoading || creating}
                  disabled={isLoading || creating}
                >
                  {t('Submit')}
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
