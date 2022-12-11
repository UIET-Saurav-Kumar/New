import Card from '@components/common/card'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InvoiceUploadList from '@components/utility-payments/table'
import LinkButton from '@components/ui/link-button'
import { useInvoiceUploadQuery } from '@data/bill-upload/use-invoices-upload.query'
import { useState } from 'react'
import { SortOrder } from '@ts-types/generated'
import ProfileSidebar from '@components/profile/profile-sidebar'
import SortForm from '@components/common/sort-form'
import Navbar from '@components/layout/navbar/navbar'
import { useModalAction } from '@components/ui/modal/modal.context'
import { useCustomerQuery } from '@data/customer/use-customer.query'
import { useEffect } from 'react'
import Label from '@components/ui/label'
import { useUI } from '@contexts/ui.context'

export default function UploadInvoice() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [orderBy, setOrder] = useState('created_at')
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
  const { refetch } = useCustomerQuery()
  const { isAuthorize } = useUI()
  const { openModal } = useModalAction()

  useEffect(() => {
    if (!isAuthorize) {
      return openModal('LOGIN_VIEW')
    }
    if (isAuthorize) {
      refetch()
    }
  }, [isAuthorize])

  const { data, isLoading: loading, error } = useInvoiceUploadQuery({
    limit: 10,
    page,
    orderBy,
    sortedBy,
  })

  if (loading) return <Loader text={'Loading...'} />
  if (error) return <ErrorMessage message="Please login or register first" />

  function handlePagination(current: any) {
    setPage(current)
  }

  return (
    <>
      <div className="invitation-status-page bg-gray-50 lg:bg-gray-100 flex flex-col">
        <Navbar label="" />

        <div className="flex mx-0 lg:mx-10 space-x-8 lg:space-x-20 ">
          <ProfileSidebar className="flex-shrink-0 hidden mt-14 xl:block xl:w-80  ml-8" />
          <div className="w-full overflow-hidden">
            <div className="flex flex-col  justify-evenly p-4 w-full mx-auto  mt-14">
              <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <h1 className="text-lg font-semibold text-heading">
                    {'Utility Payments'}
                  </h1>
                </div>

              </Card>

              <InvoiceUploadList
                invoice_upload={data?.invoice_upload}
                onPagination={handlePagination}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})
