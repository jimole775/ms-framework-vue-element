/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const entityRouter = {
  path: '/entity',
  component: Layout,
  name: 'Entity',
  meta: {
    title: 'Entity',
    icon: 'table'
  },
  children: [
    {
      path: 'area',
      component: () => import('@/views/entity-page/area/index'),
      name: 'Area',
      meta: { title: '区域' },
      hidden: false
    },
    {
      path: 'area/edit',
      component: () => import('@/views/entity-page/area/areaEditPage'),
      name: 'AreaEdit',
      meta: { title: '区域-edit' },
      hidden: true
    },
    {
      path: 'bank',
      component: () => import('@/views/entity-page/bank/index'),
      name: 'Bank',
      meta: { title: '银行(单证)' },
      hidden: false
    },
    {
      path: 'bank/edit',
      component: () => import('@/views/entity-page/bank/bankEditPage'),
      name: 'BankEdit',
      meta: { title: '银行(单证)-edit' },
      hidden: true
    },
    {
      path: 'bank-archive',
      component: () => import('@/views/entity-page/bank-archive/index'),
      name: 'BankArchive',
      meta: { title: '银行档案' },
      hidden: false
    },
    {
      path: 'bank-archive/edit',
      component: () => import('@/views/entity-page/bank-archive/bankArchiveEditPage'),
      name: 'BankArchiveEdit',
      meta: { title: '银行档案-edit' },
      hidden: true
    },
    {
      path: 'bank-info',
      component: () => import('@/views/entity-page/bank-info/index'),
      name: 'BankInfo',
      meta: { title: '银行信息' },
      hidden: false
    },
    {
      path: 'bank-info/edit',
      component: () => import('@/views/entity-page/bank-info/bankInfoEditPage'),
      name: 'BankInfoEdit',
      meta: { title: '银行信息-edit' },
      hidden: true
    },
    {
      path: 'company',
      component: () => import('@/views/entity-page/company/index'),
      name: 'Company',
      meta: { title: '公司' },
      hidden: false
    },
    {
      path: 'company/edit',
      component: () => import('@/views/entity-page/company/companyEditPage'),
      name: 'CompanyEdit',
      meta: { title: '公司-edit' },
      hidden: true
    },
    {
      path: 'container',
      component: () => import('@/views/entity-page/container/index'),
      name: 'Container',
      meta: { title: '货柜' },
      hidden: false
    },
    {
      path: 'container/edit',
      component: () => import('@/views/entity-page/container/containerEditPage'),
      name: 'ContainerEdit',
      meta: { title: '货柜-edit' },
      hidden: true
    },
    {
      path: 'container-load',
      component: () => import('@/views/entity-page/container-load/index'),
      name: 'ContainerLoad',
      meta: { title: '货柜转载最大值' },
      hidden: false
    },
    {
      path: 'container-load/edit',
      component: () => import('@/views/entity-page/container-load/containerLoadEditPage'),
      name: 'ContainerLoadEdit',
      meta: { title: '货柜转载最大值-edit' },
      hidden: true
    },
    {
      path: 'cost-project',
      component: () => import('@/views/entity-page/cost-project/index'),
      name: 'CostProject',
      meta: { title: '费用项目' },
      hidden: false
    },
    {
      path: 'cost-project/edit',
      component: () => import('@/views/entity-page/cost-project/costProjectEditPage'),
      name: 'CostProjectEdit',
      meta: { title: '费用项目-edit' },
      hidden: true
    },
    {
      path: 'credit-certificate',
      component: () => import('@/views/entity-page/credit-certificate/index'),
      name: 'CreditCertificate',
      meta: { title: '信用证录入' },
      hidden: false
    },
    {
      path: 'credit-certificate/edit',
      component: () => import('@/views/entity-page/credit-certificate/creditCertificateEditPage'),
      name: 'CreditCertificateEdit',
      meta: { title: '信用证录入-edit' },
      hidden: true
    },
    {
      path: 'currency',
      component: () => import('@/views/entity-page/currency/index'),
      name: 'Currency',
      meta: { title: '币种' },
      hidden: false
    },
    {
      path: 'currency/edit',
      component: () => import('@/views/entity-page/currency/currencyEditPage'),
      name: 'CurrencyEdit',
      meta: { title: '币种-edit' },
      hidden: true
    },
    {
      path: 'customer',
      component: () => import('@/views/entity-page/customer/index'),
      name: 'Customer',
      meta: { title: '客户' },
      hidden: false
    },
    {
      path: 'customer/edit',
      component: () => import('@/views/entity-page/customer/customerEditPage'),
      name: 'CustomerEdit',
      meta: { title: '客户-edit' },
      hidden: true
    },
    {
      path: 'customer/edit-sublist',
      component: () => import('@/views/entity-page/customer/customerEditSublistPage'),
      name: 'CustomerEditSublist',
      meta: { title: '客户-edit-sublist' },
      hidden: true
    },
    {
      path: 'customer-bank-account',
      component: () => import('@/views/entity-page/customer-bank-account/index'),
      name: 'CustomerBankAccount',
      meta: { title: '客户银行账号' },
      hidden: false
    },
    {
      path: 'customer-bank-account/edit',
      component: () => import('@/views/entity-page/customer-bank-account/customerBankAccountEditPage'),
      name: 'CustomerBankAccountEdit',
      meta: { title: '客户银行账号-edit' },
      hidden: true
    },
    {
      path: 'customer-brand',
      component: () => import('@/views/entity-page/customer-brand/index'),
      name: 'CustomerBrand',
      meta: { title: '客户品牌' },
      hidden: false
    },
    {
      path: 'customer-brand/edit',
      component: () => import('@/views/entity-page/customer-brand/customerBrandEditPage'),
      name: 'CustomerBrandEdit',
      meta: { title: '客户品牌-edit' },
      hidden: true
    },
    {
      path: 'customer-contact',
      component: () => import('@/views/entity-page/customer-contact/index'),
      name: 'CustomerContact',
      meta: { title: '客户联系方式' },
      hidden: false
    },
    {
      path: 'customer-contact/edit',
      component: () => import('@/views/entity-page/customer-contact/customerContactEditPage'),
      name: 'CustomerContactEdit',
      meta: { title: '客户联系方式-edit' },
      hidden: true
    },
    {
      path: 'customs-declaration-element',
      component: () => import('@/views/entity-page/customs-declaration-element/index'),
      name: 'CustomsDeclarationElement',
      meta: { title: '报关要素' },
      hidden: false
    },
    {
      path: 'customs-declaration-element/edit',
      component: () => import('@/views/entity-page/customs-declaration-element/customsDeclarationElementEditPage'),
      name: 'CustomsDeclarationElementEdit',
      meta: { title: '报关要素-edit' },
      hidden: true
    },
    {
      path: 'department',
      component: () => import('@/views/entity-page/department/index'),
      name: 'Department',
      meta: { title: '部门' },
      hidden: false
    },
    {
      path: 'department/edit',
      component: () => import('@/views/entity-page/department/departmentEditPage'),
      name: 'DepartmentEdit',
      meta: { title: '部门-edit' },
      hidden: true
    },
    {
      path: 'freight-standard',
      component: () => import('@/views/entity-page/freight-standard/index'),
      name: 'FreightStandard',
      meta: { title: '包干费用标准' },
      hidden: false
    },
    {
      path: 'freight-standard/edit',
      component: () => import('@/views/entity-page/freight-standard/freightStandardEditPage'),
      name: 'FreightStandardEdit',
      meta: { title: '包干费用标准-edit' },
      hidden: true
    },
    {
      path: 'freight-standard/edit-sublist',
      component: () => import('@/views/entity-page/freight-standard/freightStandardEditSublistPage'),
      name: 'FreightStandardEditSublist',
      meta: { title: '包干费用标准-edit-sublist' },
      hidden: true
    },
    {
      path: 'freight-standard-container',
      component: () => import('@/views/entity-page/freight-standard-container/index'),
      name: 'FreightStandardContainer',
      meta: { title: '包干费用标准按柜明细' },
      hidden: false
    },
    {
      path: 'freight-standard-container/edit',
      component: () => import('@/views/entity-page/freight-standard-container/freightStandardContainerEditPage'),
      name: 'FreightStandardContainerEdit',
      meta: { title: '包干费用标准按柜明细-edit' },
      hidden: true
    },
    {
      path: 'freight-standard-ticket',
      component: () => import('@/views/entity-page/freight-standard-ticket/index'),
      name: 'FreightStandardTicket',
      meta: { title: '包干费用标准按票明细' },
      hidden: false
    },
    {
      path: 'freight-standard-ticket/edit',
      component: () => import('@/views/entity-page/freight-standard-ticket/freightStandardTicketEditPage'),
      name: 'FreightStandardTicketEdit',
      meta: { title: '包干费用标准按票明细-edit' },
      hidden: true
    },
    {
      path: 'invoice-sample',
      component: () => import('@/views/entity-page/invoice-sample/index'),
      name: 'InvoiceSample',
      meta: { title: '客户箱单发票案例库' },
      hidden: false
    },
    {
      path: 'invoice-sample/edit',
      component: () => import('@/views/entity-page/invoice-sample/invoiceSampleEditPage'),
      name: 'InvoiceSampleEdit',
      meta: { title: '客户箱单发票案例库-edit' },
      hidden: true
    },
    {
      path: 'machine-type',
      component: () => import('@/views/entity-page/machine-type/index'),
      name: 'MachineType',
      meta: { title: '标准机型' },
      hidden: false
    },
    {
      path: 'machine-type/edit',
      component: () => import('@/views/entity-page/machine-type/machineTypeEditPage'),
      name: 'MachineTypeEdit',
      meta: { title: '标准机型-edit' },
      hidden: true
    },
    {
      path: 'marine-price-consultation',
      component: () => import('@/views/entity-page/marine-price-consultation/index'),
      name: 'MarinePriceConsultation',
      meta: { title: '海运价格咨询' },
      hidden: false
    },
    {
      path: 'marine-price-consultation/edit',
      component: () => import('@/views/entity-page/marine-price-consultation/marinePriceConsultationEditPage'),
      name: 'MarinePriceConsultationEdit',
      meta: { title: '海运价格咨询-edit' },
      hidden: true
    },
    {
      path: 'marine-price-consultation/edit-sublist',
      component: () => import('@/views/entity-page/marine-price-consultation/marinePriceConsultationEditSublistPage'),
      name: 'MarinePriceConsultationEditSublist',
      meta: { title: '海运价格咨询-edit-sublist' },
      hidden: true
    },
    {
      path: 'marine-price-consultation-item',
      component: () => import('@/views/entity-page/marine-price-consultation-item/index'),
      name: 'MarinePriceConsultationItem',
      meta: { title: '海运价格咨询明细' },
      hidden: false
    },
    {
      path: 'marine-price-consultation-item/edit',
      component: () => import('@/views/entity-page/marine-price-consultation-item/marinePriceConsultationItemEditPage'),
      name: 'MarinePriceConsultationItemEdit',
      meta: { title: '海运价格咨询明细-edit' },
      hidden: true
    },
    {
      path: 'material',
      component: () => import('@/views/entity-page/material/index'),
      name: 'Material',
      meta: { title: '进口物料' },
      hidden: false
    },
    {
      path: 'material/edit',
      component: () => import('@/views/entity-page/material/materialEditPage'),
      name: 'MaterialEdit',
      meta: { title: '进口物料-edit' },
      hidden: true
    },
    {
      path: 'material-process',
      component: () => import('@/views/entity-page/material-process/index'),
      name: 'MaterialProcess',
      meta: { title: '进料加工成品维护' },
      hidden: false
    },
    {
      path: 'material-process/edit',
      component: () => import('@/views/entity-page/material-process/materialProcessEditPage'),
      name: 'MaterialProcessEdit',
      meta: { title: '进料加工成品维护-edit' },
      hidden: true
    },
    {
      path: 'operate-unit',
      component: () => import('@/views/entity-page/operate-unit/index'),
      name: 'OperateUnit',
      meta: { title: '经营单位' },
      hidden: false
    },
    {
      path: 'operate-unit/edit',
      component: () => import('@/views/entity-page/operate-unit/operateUnitEditPage'),
      name: 'OperateUnitEdit',
      meta: { title: '经营单位-edit' },
      hidden: true
    },
    {
      path: 'port',
      component: () => import('@/views/entity-page/port/index'),
      name: 'Port',
      meta: { title: '港口' },
      hidden: false
    },
    {
      path: 'port/edit',
      component: () => import('@/views/entity-page/port/portEditPage'),
      name: 'PortEdit',
      meta: { title: '港口-edit' },
      hidden: true
    },
    {
      path: 'shipping-company',
      component: () => import('@/views/entity-page/shipping-company/index'),
      name: 'ShippingCompany',
      meta: { title: '船公司及货代公司' },
      hidden: false
    },
    {
      path: 'shipping-company/edit',
      component: () => import('@/views/entity-page/shipping-company/shippingCompanyEditPage'),
      name: 'ShippingCompanyEdit',
      meta: { title: '船公司及货代公司-edit' },
      hidden: true
    },
    {
      path: 'shipping-company/edit-sublist',
      component: () => import('@/views/entity-page/shipping-company/shippingCompanyEditSublistPage'),
      name: 'ShippingCompanyEditSublist',
      meta: { title: '船公司及货代公司-edit-sublist' },
      hidden: true
    },
    {
      path: 'shipping-company-contact',
      component: () => import('@/views/entity-page/shipping-company-contact/index'),
      name: 'ShippingCompanyContact',
      meta: { title: '船务公司联系方式' },
      hidden: false
    },
    {
      path: 'shipping-company-contact/edit',
      component: () => import('@/views/entity-page/shipping-company-contact/shippingCompanyContactEditPage'),
      name: 'ShippingCompanyContactEdit',
      meta: { title: '船务公司联系方式-edit' },
      hidden: true
    },
    {
      path: 'shipping-company-extra',
      component: () => import('@/views/entity-page/shipping-company-extra/index'),
      name: 'ShippingCompanyExtra',
      meta: { title: '船公司固定加价' },
      hidden: false
    },
    {
      path: 'shipping-company-extra/edit',
      component: () => import('@/views/entity-page/shipping-company-extra/shippingCompanyExtraEditPage'),
      name: 'ShippingCompanyExtraEdit',
      meta: { title: '船公司固定加价-edit' },
      hidden: true
    },
    {
      path: 'trade-documenter',
      component: () => import('@/views/entity-page/trade-documenter/index'),
      name: 'TradeDocumenter',
      meta: { title: '单证人员' },
      hidden: false
    },
    {
      path: 'trade-documenter/edit',
      component: () => import('@/views/entity-page/trade-documenter/tradeDocumenterEditPage'),
      name: 'TradeDocumenterEdit',
      meta: { title: '单证人员-edit' },
      hidden: true
    },
    {
      path: 'unit-measurement',
      component: () => import('@/views/entity-page/unit-measurement/index'),
      name: 'UnitMeasurement',
      meta: { title: '计量单位' },
      hidden: false
    },
    {
      path: 'unit-measurement/edit',
      component: () => import('@/views/entity-page/unit-measurement/unitMeasurementEditPage'),
      name: 'UnitMeasurementEdit',
      meta: { title: '计量单位-edit' },
      hidden: true
    },
    {
      path: 'commercial-invoice',
      component: () => import('@/views/entity-page/commercial-invoice/index'),
      name: 'CommercialInvoice',
      meta: { title: '商业发票' },
      hidden: false
    },
    {
      path: 'commercial-invoice/edit',
      component: () => import('@/views/entity-page/commercial-invoice/commercialInvoiceEditPage'),
      name: 'CommercialInvoiceEdit',
      meta: { title: '商业发票-edit' },
      hidden: true
    },
    {
      path: 'deliver-report',
      component: () => import('@/views/entity-page/deliver-report/index'),
      name: 'DeliverReport',
      meta: { title: '出运申报' },
      hidden: false
    },
    {
      path: 'deliver-report/edit',
      component: () => import('@/views/entity-page/deliver-report/deliverReportEditPage'),
      name: 'DeliverReportEdit',
      meta: { title: '出运申报-edit' },
      hidden: true
    },
    {
      path: 'freight-pay',
      component: () => import('@/views/entity-page/freight-pay/index'),
      name: 'FreightPay',
      meta: { title: '国内包干费支付' },
      hidden: false
    },
    {
      path: 'freight-pay/edit',
      component: () => import('@/views/entity-page/freight-pay/freightPayEditPage'),
      name: 'FreightPayEdit',
      meta: { title: '国内包干费支付-edit' },
      hidden: true
    },
    {
      path: 'freight-pay/edit-sublist',
      component: () => import('@/views/entity-page/freight-pay/freightPayEditSublistPage'),
      name: 'FreightPayEditSublist',
      meta: { title: '国内包干费支付-edit-sublist' },
      hidden: true
    },
    {
      path: 'freight-pay-invoice',
      component: () => import('@/views/entity-page/freight-pay-invoice/index'),
      name: 'FreightPayInvoice',
      meta: { title: '内陆包干费用支付发票明细' },
      hidden: false
    },
    {
      path: 'freight-pay-invoice/edit',
      component: () => import('@/views/entity-page/freight-pay-invoice/freightPayInvoiceEditPage'),
      name: 'FreightPayInvoiceEdit',
      meta: { title: '内陆包干费用支付发票明细-edit' },
      hidden: true
    },
    {
      path: 'expense-record-item',
      component: () => import('@/views/entity-page/expense-record-item/index'),
      name: 'ExpenseRecordItem',
      meta: { title: '费用登记明细' },
      hidden: false
    },
    {
      path: 'expense-record-item/edit',
      component: () => import('@/views/entity-page/expense-record-item/expenseRecordItemEditPage'),
      name: 'ExpenseRecordItemEdit',
      meta: { title: '费用登记明细-edit' },
      hidden: true
    },
    {
      path: 'expense-record',
      component: () => import('@/views/entity-page/expense-record/index'),
      name: 'ExpenseRecord',
      meta: { title: '费用登记' },
      hidden: false
    },
    {
      path: 'expense-record/edit',
      component: () => import('@/views/entity-page/expense-record/expenseRecordEditPage'),
      name: 'ExpenseRecordEdit',
      meta: { title: '费用登记-edit' },
      hidden: true
    },
    {
      path: 'expense-record/edit-sublist',
      component: () => import('@/views/entity-page/expense-record/expenseRecordEditSublistPage'),
      name: 'ExpenseRecordEditSublist',
      meta: { title: '费用登记-edit-sublist' },
      hidden: true
    },
    {
      path: 'shipping-pay',
      component: () => import('@/views/entity-page/shipping-pay/index'),
      name: 'ShippingPay',
      meta: { title: '海运费支付' },
      hidden: false
    },
    {
      path: 'shipping-pay/edit',
      component: () => import('@/views/entity-page/shipping-pay/shippingPayEditPage'),
      name: 'ShippingPayEdit',
      meta: { title: '海运费支付-edit' },
      hidden: true
    },
    {
      path: 'shipping-pay/edit-sublist',
      component: () => import('@/views/entity-page/shipping-pay/shippingPayEditSublistPage'),
      name: 'ShippingPayEditSublist',
      meta: { title: '海运费支付-edit-sublist' },
      hidden: true
    },
    {
      path: 'custom-confirm',
      component: () => import('@/views/entity-page/custom-confirm/index'),
      name: 'CustomConfirm',
      meta: { title: '清关单据确认' },
      hidden: false
    },
    {
      path: 'custom-confirm/edit',
      component: () => import('@/views/entity-page/custom-confirm/customConfirmEditPage'),
      name: 'CustomConfirmEdit',
      meta: { title: '清关单据确认-edit' },
      hidden: true
    },
    {
      path: 'change-order',
      component: () => import('@/views/entity-page/change-order/index'),
      name: 'ChangeOrder',
      meta: { title: '改单申请' },
      hidden: false
    },
    {
      path: 'change-order/edit',
      component: () => import('@/views/entity-page/change-order/changeOrderEditPage'),
      name: 'ChangeOrderEdit',
      meta: { title: '改单申请-edit' },
      hidden: true
    },
    {
      path: 'commercial-invoice-neutralize',
      component: () => import('@/views/entity-page/commercial-invoice-neutralize/index'),
      name: 'CommercialInvoiceNeutralize',
      meta: { title: '商业发票红冲' },
      hidden: false
    },
    {
      path: 'commercial-invoice-neutralize/edit',
      component: () => import('@/views/entity-page/commercial-invoice-neutralize/commercialInvoiceNeutralizeEditPage'),
      name: 'CommercialInvoiceNeutralizeEdit',
      meta: { title: '商业发票红冲-edit' },
      hidden: true
    },
    {
      path: 'shipping-advance',
      component: () => import('@/views/entity-page/shipping-advance/index'),
      name: 'ShippingAdvance',
      meta: { title: '海运费预提' },
      hidden: false
    },
    {
      path: 'shipping-advance/edit',
      component: () => import('@/views/entity-page/shipping-advance/shippingAdvanceEditPage'),
      name: 'ShippingAdvanceEdit',
      meta: { title: '海运费预提-edit' },
      hidden: true
    },
    {
      path: 'freight-advance',
      component: () => import('@/views/entity-page/freight-advance/index'),
      name: 'FreightAdvance',
      meta: { title: '包干费用预提' },
      hidden: false
    },
    {
      path: 'freight-advance/edit',
      component: () => import('@/views/entity-page/freight-advance/freightAdvanceEditPage'),
      name: 'FreightAdvanceEdit',
      meta: { title: '包干费用预提-edit' },
      hidden: true
    },
    {
      path: 'commercial-invoice-split',
      component: () => import('@/views/entity-page/commercial-invoice-split/index'),
      name: 'CommercialInvoiceSplit',
      meta: { title: '商业发票拆分/合并', keepAlive: false },
      hidden: false
    },
    {
      path: 'commercial-invoice-split/edit',
      component: () => import('@/views/entity-page/commercial-invoice-split/commercialInvoiceSplitEditPage'),
      name: 'CommercialInvoiceSplitEdit',
      meta: { title: '商业发票拆分/合并-edit', keepAlive: false },
      hidden: true
    },
    {
      path: 'financing-registration',
      component: () => import('@/views/entity-page/financing-registration/index'),
      name: 'FinancingRegistration',
      meta: { title: '融资登记' },
      hidden: false
    },
    {
      path: 'financing-registration/edit/:id',
      component: () => import('@/views/entity-page/financing-registration/financingRegistrationEditPage'),
      name: 'FinancingRegistrationEdit',
      meta: { title: '融资登记-edit', keepAlive: false },
      hidden: true
    },
    {
      path: 'buyer',
      component: () => import('@/views/entity-page/buyer/index'),
      name: 'Buyer',
      meta: { title: '买方档案' },
      hidden: false
    },
    {
      path: 'buyer/edit',
      component: () => import('@/views/entity-page/buyer/buyerEditPage'),
      name: 'BuyerEdittest',
      meta: { title: '买方档案-edit' },
      hidden: true
    },
    {
      path: 'buyer/edit/:id',
      component: () => import('@/views/entity-page/buyer/buyerEditPage'),
      name: 'BuyerEdit',
      meta: { title: '买方档案-edit' },
      hidden: true
    },
    {
      path: 'irregular-invoice',
      component: () => import('@/views/entity-page/irregular-invoice/index'),
      name: 'IrregularInvoice',
      meta: { title: '特殊单据申请' },
      hidden: false
    },
    {
      path: 'irregular-invoice/edit/:id',
      component: () => import('@/views/entity-page/irregular-invoice/irregularInvoiceEditPage'),
      name: 'IrregularInvoiceEdit',
      meta: { title: '特殊单据申请-edit' },
      hidden: true
    },
    {
      path: 'damage-notice',
      component: () => import('@/views/entity-page/damage-notice/index'),
      name: 'DamageNotice',
      meta: { title: '可损通知' },
      hidden: false
    },
    {
      path: 'damage-notice/edit/:id',
      component: () => import('@/views/entity-page/damage-notice/damageNoticeEditPage'),
      name: 'DamageNoticeEdit',
      meta: { title: '可损通知-edit' },
      hidden: true
    },
    {
      path: 'order-notice',
      component: () => import('@/views/entity-page/order-notice/index'),
      name: 'OrderNotice',
      meta: { title: '提单放单' },
      hidden: false
    },
    {
      path: 'order-notice/edit/:id',
      component: () => import('@/views/entity-page/order-notice/orderNoticeEditPage'),
      name: 'OrderNoticeEdit',
      meta: { title: '提单放单-edit' },
      hidden: true
    },
    {
      path: 'ship-cabin-order',
      component: () => import('@/views/entity-page/ship-cabin-order/index'),
      name: 'ShipCabinOrder',
      meta: { title: '订舱' },
      hidden: false
    },
    {
      path: 'ship-cabin-order/edit/:id',
      component: () => import('@/views/entity-page/ship-cabin-order/shipCabinOrderEditPage'),
      name: 'ShipCabinOrderEdit',
      meta: { title: '订舱-edit' },
      hidden: true
    },
    {
      path: 'get-container-project',
      component: () => import('@/views/entity-page/get-container-project/index'),
      name: 'GetContainerProject',
      meta: { title: '拖柜计划' },
      hidden: false
    },
    {
      path: 'get-container-project/edit/:id',
      component: () => import('@/views/entity-page/get-container-project/getContainerProjectEditPage'),
      name: 'GetContainerProjectEdit',
      meta: { title: '拖柜计划-edit' },
      hidden: true
    },
    {
      path: 'clearance-manual-item',
      component: () => import('@/views/entity-page/clearance-manual-item/index'),
      name: 'ClearanceManualItem',
      meta: { title: '料件信息' },
      hidden: false
    },
    {
      path: 'clearance-manual-item/edit/:id',
      component: () => import('@/views/entity-page/clearance-manual-item/clearanceManualItemEditPage'),
      name: 'ClearanceManualItemEdit',
      meta: { title: '料件信息-edit' },
      hidden: true
    },
    {
      path: 'clearance-manual',
      component: () => import('@/views/entity-page/clearance-manual/index'),
      name: 'ClearanceManual',
      meta: { title: '通关手册录入' },
      hidden: false
    },
    {
      path: 'clearance-manual/edit/:id',
      component: () => import('@/views/entity-page/clearance-manual/clearanceManualEditPage'),
      name: 'ClearanceManualEdit',
      meta: { title: '通关手册录入-edit' },
      hidden: true
    },
    {
      path: 'clearance-manual/edit-sublist/:id',
      component: () => import('@/views/entity-page/clearance-manual/clearanceManualEditSublistPage'),
      name: 'ClearanceManualEditSublist',
      meta: { title: '通关手册录入-edit-sublist' },
      hidden: true
    },
    {
      path: 'clearance-manual-product',
      component: () => import('@/views/entity-page/clearance-manual-product/index'),
      name: 'ClearanceManualProduct',
      meta: { title: '成品信息' },
      hidden: false
    },
    {
      path: 'clearance-manual-product/edit/:id',
      component: () => import('@/views/entity-page/clearance-manual-product/clearanceManualProductEditPage'),
      name: 'ClearanceManualProductEdit',
      meta: { title: '成品信息-edit' },
      hidden: true
    },
    {
      path: 'feed-register',
      component: () => import('@/views/entity-page/feed-register/index'),
      name: 'FeedRegister',
      meta: { title: '进口料件登记' },
      hidden: false
    },
    {
      path: 'feed-register/edit/:id',
      component: () => import('@/views/entity-page/feed-register/feedRegisterEditPage'),
      name: 'FeedRegisterEdit',
      meta: { title: '进口料件登记-edit' },
      hidden: true
    },
    {
      path: 'submit-order-item',
      component: () => import('@/views/entity-page/submit-order-item/index'),
      name: 'SubmitOrderItem',
      meta: { title: '交单登记明细' },
      hidden: false
    },
    {
      path: 'submit-order-item/edit/:id',
      component: () => import('@/views/entity-page/submit-order-item/submitOrderItemEditPage'),
      name: 'SubmitOrderItemEdit',
      meta: { title: '交单登记明细-edit' },
      hidden: true
    },
    {
      path: 'submit-order/edit/:id',
      component: () => import('@/views/entity-page/submit-order/submitOrderEditPage'),
      name: 'SubmitOrderEdit',
      meta: { title: '交单登记-edit' },
      hidden: true
    },
    {
      path: 'submit-order/edit-sublist/:id',
      component: () => import('@/views/entity-page/submit-order/submitOrderEditSublistPage'),
      name: 'SubmitOrderEditSublist',
      meta: { title: '交单登记-edit-sublist' },
      hidden: true
    },
    {
      path: 'submit-order',
      component: () => import('@/views/entity-page/submit-order/index'),
      name: 'SubmitOrder',
      meta: { title: '交单登记' },
      hidden: false
    },
    /* Generator tag - Install page router here */
  ]
}
export default entityRouter
