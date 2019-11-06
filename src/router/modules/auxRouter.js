import Layout from '@/views/layout/Layout'
const auxRouter = [
  {
    path: '/',
    component: Layout,
    meta: { title: 'indexControl' },
    children: [
      {
        path: '/',
        component: () => import('@/views/home-page/index'),
        name: 'HomePage',
        meta: { title: '工作台' }
      },
      {
        path: 'rate-view',
        // component: () => import('@/views/home-page/index'),
        name: 'RateStopView',
        meta: { title: '停空率看板' }
      },
      {
        path: 'todo-pool',
        component: () => import('@/views/home-page/todoPool'),
        name: 'ToDoPool',
        meta: { title: '待办池' }
      },
    ]
  },
  {
    path: '/change-password',
    component: Layout,
    meta: { title: '修改密码' },
    hidden: true,
    children: [
      {
        path: '/',
        component: () => import('@/views/user-info/changePassword'),
        name: 'ChangePassword',
        meta: { title: '修改密码' }
      },
    ]
  },
  {
    path: '/basic-info',
    component: Layout,
    meta: { title: 'basicInfo' },
    name: '基础信息',
    children: [
      {
        path: 'area',
        component: () => import('@/views/entity-page/area/index'),
        meta: { title: '国家信息', keepAlive: true },
        name: 'AreaManagement'
      },
      {
        path: 'CW-basic-info',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '船务-数据' },
        name: 'basicCW',
        children: [
          {
            path: 'port',
            component: () => import('@/views/entity-page/port/index'),
            name: 'PortManagement',
            meta: { title: '港口', keepAlive: true }
          },
          {
            path: 'cost-project',
            component: () => import('@/views/entity-page/cost-project/index'),
            name: 'CostProjectManagement',
            meta: { title: '项目费用', keepAlive: true }
          },
          {
            path: 'container-load',
            component: () => import('@/views/entity-page/container-load/index'),
            name: 'ContainerLoadManagement',
            meta: { title: '柜型柜量最大值', keepAlive: true }
          },
          {
            path: 'shipping-company',
            component: () => import('@/views/entity-page/shipping-company/index'),
            name: 'ShippingCompanyManagement',
            meta: { title: '船公司及货代公司', keepAlive: true }
          },
          {
            path: 'shipping-company/edit/:id',
            component: () => import('@/views/entity-page/shipping-company/shippingCompanyEditSublistPage'),
            name: 'ShippingCompanyEditSublistPage',
            hidden: true,
            meta: { title: '船公司及货代公司-编辑', keepAlive: true }
          },
        ]
      },
      {
        path: 'DZ-basic-info',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '单证-数据' },
        name: 'basicDZ',
        children: [
          {
            path: 'customs-declaration-element',
            component: () => import('@/views/entity-page/customs-declaration-element/index'),
            name: 'CustomsDeclarationElementManagement',
            meta: { title: '报关要素', keepAlive: true }
          },
          {
            path: 'bank',
            component: () => import('@/views/entity-page/bank/index'),
            name: 'BankManagement',
            meta: { title: '银行名称(单证)', keepAlive: true }
          },
          {
            path: 'invoice-sample',
            component: () => import('@/views/entity-page/invoice-sample/index'),
            name: 'InvoiceSampleManagement',
            meta: { title: '客户箱单发票案例库', keepAlive: true }
          },
          {
            path: 'trade-documenter',
            component: () => import('@/views/entity-page/trade-documenter/index'),
            name: 'TradeDocumenterManagement',
            meta: { title: '船务单证人员', keepAlive: true }
          },
        ]
      },
    ]
  },
  {
    path: '/DZ-manage',
    component: Layout,
    meta: { title: '单证管理' },
    name: 'DZManage',
    children: [
      {
        path: 'feed-manual-ledger',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '进料手册台账' },
        name: 'DZFeedManualLedger',
        children: [
          {
            path: 'clearance-manual',
            component: () => import('@/views/entity-page/clearance-manual/index'),
            name: 'ClearanceManualManagement',
            meta: { title: '通关手册录入', keepAlive: true }
          },
          {
            path: 'clearance-manual-edit/:id',
            component: () => import('@/views/entity-page/clearance-manual/clearanceManualEditSublistPage'),
            name: 'ClearanceManualEditSublistPage',
            meta: { title: '通关手册录入-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'feed-register',
            component: () => import('@/views/entity-page/feed-register/index'),
            name: 'FeedRegisterManagement',
            meta: { title: '进口料件登记', keepAlive: true }
          },
          {
            path: 'feed-manual',
            component: () => import('@/views/entity-page/feed-manual/index'),
            name: 'FeedManualManagement',
            meta: { title: '进销台账', keepAlive: true }
          },
        ]
      },
      {
        path: 'invoice-manage',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '发票管理' },
        name: 'DZInvoiceManage',
        children: [
          {
            path: 'commercial-invoice',
            component: () => import('@/views/entity-page/commercial-invoice/index'),
            name: 'CommercialInvoiceManagement',
            meta: { title: '商业发票', keepAlive: true }
          },
          {
            path: 'commercial-invoice/edit/:id',
            component: () => import('@/views/entity-page/commercial-invoice/commercialInvoiceEditPage'),
            name: 'CommercialInvoiceEditPage',
            meta: { title: '商业发票-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'commercial-invoice-neutralize',
            component: () => import('@/views/entity-page/commercial-invoice-neutralize/index'),
            name: 'CommercialInvoiceNeutralizeManagement',
            meta: { title: '商业发票红冲', keepAlive: true }
          },
          {
            path: 'commercial-invoice-neutralize/edit/:id',
            component: () => import('@/views/entity-page/commercial-invoice-neutralize/commercialInvoiceNeutralizeEditPage'),
            name: 'CommercialInvoiceNeutralizeEditPage',
            meta: { title: '商业发票红冲-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'commercial-invoice-split',
            component: () => import('@/views/entity-page/commercial-invoice-split/index'),
            name: 'CommercialInvoiceSplitManagement',
            meta: { title: '商业发票拆分/合并', keepAlive: false }
          },
          {
            path: 'commercial-invoice-split/edit/:id/:mergingSplitType',
            component: () => import('@/views/entity-page/commercial-invoice-split/commercialInvoiceSplitEditPage'),
            name: 'CommercialInvoiceSplitEditPage',
            meta: { title: '商业发票拆分/合并-编辑', keepAlive: false },
            hidden: true
          },
          {
            path: 'financing-registration',
            component: () => import('@/views/entity-page/financing-registration/index'),
            name: 'FinancingRegistrationManagement',
            meta: { title: '融资登记', keepAlive: true }
          },
          {
            path: 'financing-registration/edit/:id',
            component: () => import('@/views/entity-page/financing-registration/financingRegistrationEditPage'),
            name: 'FinancingRegistrationEditPage',
            meta: { title: '融资登记-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'irregular-invoice',
            component: () => import('@/views/entity-page/irregular-invoice/index'),
            name: 'IrregularInvoiceManagement',
            meta: { title: '特殊单据申请', keepAlive: true }
          },
          {
            path: 'irregular-invoice/edit/:id',
            component: () => import('@/views/entity-page/irregular-invoice/irregularInvoiceEditPage'),
            name: 'IrregularInvoiceEditPage',
            meta: { title: '特殊单据申请-编辑', keepAlive: true },
            hidden: true
          },
        ]
      },
      {
        path: 'submit-amend',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '提单/改单' },
        name: 'DZSubmitAmend',
        children: [
          {
            path: 'order-notice',
            component: () => import('@/views/entity-page/order-notice/index'),
            name: 'OrderNoticeManagement',
            meta: { title: '提单放单', keepAlive: true }
          },
          {
            path: 'order-notice/edit/:id',
            component: () => import('@/views/entity-page/order-notice/orderNoticeEditPage'),
            name: 'OrderNoticeEditPage',
            meta: { title: '提单放单-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'change-order',
            component: () => import('@/views/entity-page/change-order/index'),
            name: 'ChangeOrderManagement',
            meta: { title: '改单申请', keepAlive: true }
          },
          {
            path: 'change-order/edit/:id',
            component: () => import('@/views/entity-page/change-order/changeOrderEditPage'),
            name: 'ChangeOrderEditPage',
            meta: { title: 'changeBill', keepAlive: true },
            hidden: true
          },
          {
            path: 'make-order',
            component: () => import('@/views/entity-page/make-order/index'),
            name: 'MakeOrderManagement',
            meta: { title: '制作提单', keepAlive: true }
          },
          {
            path: 'make-order/edit/:id',
            component: () => import('@/views/entity-page/make-order/makeOrderEditPage'),
            name: 'MakeOrderEditPage',
            meta: { title: '制作提单-编辑', keepAlive: true },
            hidden: true,
          },
        ]
      },
      {
        path: 'liquidation-surrender-bill',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '清关交单' },
        name: 'DZLiquidationSurrenderBill',
        children: [
          {
            path: 'custom-confirm',
            component: () => import('@/views/entity-page/custom-confirm/index'),
            name: 'CustomConfirmManagement',
            meta: { title: '清关单据确认', keepAlive: true }
          },
          {
            path: 'custorm-confirm/edit/:id',
            component: () => import('@/views/entity-page/custom-confirm/customConfirmEditPage'),
            name: 'CustomConfirmEditPage',
            meta: { title: '清关单确认-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'submit-order',
            component: () => import('@/views/entity-page/submit-order/index'),
            name: 'SubmitOrderManagement',
            meta: { title: '交单登记', keepAlive: true }
          },
          {
            path: 'submit-order/edit/:id',
            component: () => import('@/views/entity-page/submit-order/submitOrderEditSublistPage'),
            name: 'SubmitOrderEditPage',
            meta: { title: '交单登记-编辑', keepAlive: true },
            hidden: true,
          },
        ]
      },
      {
        path: 'customs-manage',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '报关管理' },
        name: 'DZCustomsManage',
        children: [
          {
            path: 'customs-bill',
            component: () => import('@/views/entity-page/customs-bill/index'),
            name: 'CustomsBillManagement',
            meta: { title: '报关单', keepAlive: true }
          },
          {
            path: 'customs-bill/edit/:id',
            component: () => import('@/views/entity-page/customs-bill/customsBillEditPage'),
            name: 'CustomsBillEditPage',
            meta: { title: '报关单-编辑', keepAlive: true },
            hidden: true,
          },
          {
            path: 'customs-bill-fed',
            component: () => import('@/views/entity-page/customs-bill-fed/index'),
            name: 'CustomsBillFedManagement',
            meta: { title: '报关单反馈', keepAlive: true }
          },
          {
            path: 'customs-bill-fed/edit/:id',
            component: () => import('@/views/entity-page/customs-bill-fed/customsBillFedEditPage'),
            name: 'CustomsBillFedEditPage',
            meta: { title: '报关单反馈-编辑', keepAlive: true },
            hidden: true,
          },
        ]
      },
      {
        path: 'citic-is-protected',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '中信保' },
        name: 'DZCiticIsProtected',
        children: [
          {
            path: 'deliver-report',
            component: () => import('@/views/entity-page/deliver-report/index'),
            name: 'DeliverReportManagement',
            meta: { title: '出运申报', keepAlive: true },
          },
          {
            path: 'deliver-report/edit/:id',
            component: () => import('@/views/entity-page/deliver-report/deliverReportEditPage'),
            name: 'DeliverReportEditPage',
            meta: { title: '出运申报-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'declare-change',
            component: () => import('@/views/entity-page/declare-change/index'),
            name: 'DeclareChangeManagement',
            meta: { title: '出运申报变更', keepAlive: true }
          },
          {
            path: 'declare-change/edit/:id',
            component: () => import('@/views/entity-page/declare-change/deliverChangeEditPage'),
            name: 'DeliverChangeEditPage',
            meta: { title: '出运申报变更-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'damage-notice',
            component: () => import('@/views/entity-page/damage-notice/index'),
            name: 'DamageNoticeManagement',
            meta: { title: '可损通知', keepAlive: true }
          },
          {
            path: 'damage-notice/edit/:id',
            component: () => import('@/views/entity-page/damage-notice/damageNoticeEditPage'),
            name: 'DamageNoticeEditPage',
            meta: { title: '可损通知-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'damage-close',
            component: () => import('@/views/entity-page/damage-close/index'),
            name: 'DamageCloseManagement',
            meta: { title: '可损通知结案', keepAlive: true }
          },
          {
            path: 'damage-close/edit/:id',
            component: () => import('@/views/entity-page/damage-close/damageCloseEditPage'),
            name: 'DamageCloseEditPage',
            meta: { title: '可损通知结案-编辑', keepAlive: true },
            hidden: true
          },
        ]
      },
      {
        path: 'letter-of-credit',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '信用证' },
        name: 'DZLetterOfCredit',
        children: [
          {
            path: 'credit-certificate',
            component: () => import('@/views/entity-page/credit-certificate/index'),
            name: 'CreditCertificateManagement',
            meta: { title: '信用证录入', keepAlive: true }
          },
          {
            path: 'credit-certificate/edit/:id',
            component: () => import('@/views/entity-page/credit-certificate/creditCertificateEditPage'),
            name: 'CreditCertificateEditPage',
            meta: { title: '信用证录入-编辑', keepAlive: true },
            hidden: true,
          },
          {
            path: 'credit-change',
            component: () => import('@/views/entity-page/credit-change/index'),
            name: 'CreditChangeManagement',
            meta: { title: '信用证变更', keepAlive: true }
          },
          {
            path: 'credit-change/edit/:id',
            component: () => import('@/views/entity-page/credit-change/creditChangeEditPage'),
            name: 'CreditChangeEditPage',
            meta: { title: '信用证变更-编辑', keepAlive: true },
            hidden: true,
          },
          {
            path: 'credit-close',
            component: () => import('@/views/entity-page/credit-close/index'),
            name: 'CreditCloseManagement',
            meta: { title: '信用证作废', keepAlive: true }
          },
          {
            path: 'credit-close/edit/:id',
            component: () => import('@/views/entity-page/credit-close/creditCloseEditPage'),
            name: 'CreditCloseEditPage',
            meta: { title: '信用证作废-编辑', keepAlive: true },
            hidden: true,
          },
          {
            path: 'credit-merge',
            component: () => import('@/views/entity-page/credit-merge/index'),
            name: 'CreditMergeManagement',
            meta: { title: '信用证合并', keepAlive: true }
          },
          {
            path: 'credit-merge/edit/:id',
            component: () => import('@/views/entity-page/credit-merge/creditMergeEditPage'),
            name: 'CreditMergeEditPage',
            meta: { title: '信用证合并-编辑', keepAlive: true },
            hidden: true,
          },
        ]
      },
    ]
  },
  {
    path: '/CW-manage',
    component: Layout,
    meta: { title: '船务管理' },
    name: 'CWManage',
    children: [
      {
        path: 'marine-price-consultation',
        component: () => import('@/views/entity-page/marine-price-consultation/index'),
        name: 'MarinePriceConsultationManagement',
        meta: { title: '海运费询价', keepAlive: true }
      },
      {
        path: 'marine-price-consultation/edit/:id',
        component: () => import('@/views/entity-page/marine-price-consultation/marinePriceConsultationEditSublistPage'),
        name: 'MarinePriceConsultationEditSublistPage',
        meta: { title: '海运费询价-编辑', keepAlive: true },
        hidden: true,
      },
      {
        path: 'marine-quoted-price',
        component: () => import('@/views/entity-page/marine-quoted-price/index'),
        name: 'MarineQuotedPriceManagement',
        meta: { title: '供应商报价', keepAlive: true }
      },
      {
        path: 'marine-quoted-price/edit/:id',
        component: () => import('@/views/entity-page/marine-quoted-price/marinePriceConsultationEditSublistPage'),
        name: 'QuotedPriceEditSublist',
        meta: { title: '供应商报价-编辑', keepAlive: true },
        hidden: true,
      },
      {
        path: 'ship-cabin-order',
        component: () => import('@/views/entity-page/ship-cabin-order/index'),
        name: 'ShipCabinOrderManagement',
        meta: { title: '订舱', keepAlive: true }
      },
      {
        path: 'ship-cabin-order/edit/:id',
        component: () => import('@/views/entity-page/ship-cabin-order/shipCabinOrderEditPage'),
        name: 'ShipCabinOrderEditPage',
        meta: { title: '订舱-编辑', keepAlive: true },
        hidden: true
      },
      {
        path: 'ship-cabin-order-change',
        component: () => import('@/views/entity-page/ship-cabin-order/shipCabinOrderChange'),
        name: 'ShipCabinOrderChangeManagement',
        meta: { title: '订舱变更', keepAlive: true }
      },
      {
        path: 'ship-cabin-order-change/detail/:id',
        component: () => import('@/views/entity-page/ship-cabin-order/shipCabinOrderChangeEditPage'),
        name: 'ShipCabinOrderChangeEditPage',
        meta: { title: '订舱变更详情', keepAlive: true },
        hidden: true
      },
      {
        path: 'get-container-project',
        component: () => import('@/views/entity-page/get-container-project/index'),
        name: 'GetContainerProjectManagement',
        meta: { title: '拖柜计划', keepAlive: true }
      },
      {
        path: 'get-container-project/edit/:id',
        component: () => import('@/views/entity-page/get-container-project/getContainerProjectEditPage'),
        name: 'GetContainerProjectEditPage',
        meta: { title: '拖柜计划-编辑', keepAlive: true },
        hidden: true
      },
      {
        path: 'fee-manage',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '费用管理' },
        name: 'DZFeeManage',
        children: [
          {
            path: 'freight-standard',
            component: () => import('@/views/entity-page/freight-standard/index'),
            name: 'FreightStandardManagement',
            meta: { title: '包干费用标准', keepAlive: true }
          },
          {
            path: 'freight-standard/edit-sublist/:id',
            component: () => import('@/views/entity-page/freight-standard/freightStandardEditSublistPage'),
            name: 'FreightStandardEditSublistPage',
            meta: { title: '包干费用标准-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'freight-advance',
            component: () => import('@/views/entity-page/freight-advance/index'),
            name: 'FreightAdvanceManagement',
            meta: { title: '内陆包干费预提', keepAlive: true }
          },
          {
            path: 'freight-advance/edit-sublist/:id',
            component: () => import('@/views/entity-page/freight-advance/freightAdvanceEditSublistPage'),
            name: 'FreightAdvanceEditSublistPage',
            meta: { title: '内陆包干费预提-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'shipping-advance',
            component: () => import('@/views/entity-page/shipping-advance/index'),
            name: 'ShippingAdvanceManagement',
            meta: { title: '海运费预提', keepAlive: true }
          },
          {
            path: 'shipping-advance/edit/:id',
            component: () => import('@/views/entity-page/shipping-advance/shippingAdvanceEditPage'),
            name: 'ShippingAdvanceEditPage',
            meta: { title: '海运费预提-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'expense-record',
            component: () => import('@/views/entity-page/expense-record/index'),
            name: 'ExpenseRecordManagement',
            meta: { title: '费用登记', keepAlive: true }
          },
          {
            path: 'expense-record/edit-sublist/:id',
            component: () => import('@/views/entity-page/expense-record/expenseRecordEditPage'),
            name: 'ExpenseRecordEditPage',
            meta: { title: '费用登记-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'extra-fee',
            component: () => import('@/views/entity-page/extra-fee/index'),
            name: 'ExtraFeeManagement',
            meta: { title: '额外费用登记', keepAlive: true }
          },
          {
            path: 'extra-fee/edit/:id',
            component: () => import('@/views/entity-page/extra-fee/extraFeeEditSublistPage'),
            name: 'ExtraFeeEditSublistPage',
            meta: { title: '额外费用登记-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'fee-pay',
            component: () => import('@/views/entity-page/fee-pay/index'),
            name: 'FeePayManagement',
            meta: { title: '内陆包干费支付', keepAlive: true }
          },
          {
            path: 'fee-pay-edit/:id',
            component: () => import('@/views/entity-page/fee-pay/feePayEditSublistPage'),
            name: 'FeePayEditSublistPage',
            meta: { title: '内陆包干费支付-编辑', keepAlive: true },
            hidden: true
          },
          {
            path: 'freight-pay',
            component: () => import('@/views/entity-page/freight-pay/index'),
            name: 'FreightPayManagement',
            meta: { title: '海运费支付', keepAlive: true }
          },
          {
            path: 'freight-pay-edit/:id',
            component: () => import('@/views/entity-page/freight-pay/freightPayEditSublistPage'),
            name: 'FreightPayEditSublistPage',
            meta: { title: '海运费支付-编辑', keepAlive: true },
            hidden: true
          },
        ]
      },
    ]
  },
  {
    path: '/report-manage',
    component: Layout,
    meta: { title: '报表管理' },
    name: 'reportManage',
    children: [
      {
        path: 'report-CW',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '船务报表' },
        name: 'reportCW',
        children: [
          {
            path: 'core-indicators-stand',
            component: () => import('@/views/entity-page/statistics/coreIndicatorsStand'),
            name: 'CoreIndicatorsStand',
            meta: { title: '核心指标看台', keepAlive: true }
          },
          {
            path: 'abnormal-accountable',
            // component: () => import('@/views/entity-page/abnormal-accountable/index'),
            name: 'AbnormalAccountableManagement',
            meta: { title: '发货异常追责报表', keepAlive: true }
          },
          {
            path: 'tow-cabinet-report',
            component: () => import('@/views/entity-page/statistics/towingCabinetStatistics'),
            name: 'TowingCabinetStatistics',
            meta: { title: '拖柜报表', keepAlive: true }
          },
          {
            path: 'tow-cabinet-summary',
            component: () => import('@/views/entity-page/statistics/towerSummary'),
            name: 'TowerSummary',
            meta: { title: '拖柜汇总报表', keepAlive: true }
          },
          {
            path: 'supplier-evaluation-notice',
            component: () => import('@/views/entity-page/statistics/supplierEvaluationNotice'),
            name: 'VendorEvaluateManagement',
            meta: { title: '供应商考核通报表', keepAlive: true }
          },
          {
            path: 'designated-freight-forward',
            component: () => import('@/views/entity-page/statistics/designatedFreightForwardStatistics'),
            name: 'DesignatedFreightForwardStatistics',
            meta: { title: '指定货代出运报表', keepAlive: true }
          },
          {
            path: 'book-space-progress',
            component: () => import('@/views/entity-page/statistics/bookingShippingNotice'),
            name: 'BookSpaceProgressManagement',
            meta: { title: '订舱发货进度通报表', keepAlive: true }
          },
          {
            path: 'agreement-freight-forwarder-allocation-ratio',
            component: () => import('@/views/entity-page/statistics/agreementFreightForwarderAllocationRatioStatistics'),
            name: 'AgreementFreightForwarderAllocationRatioStatistics',
            meta: { title: '协议货代分配比例报表', keepAlive: true }
          },
          {
            path: 'shipping-capacity',
            component: () => import('@/views/entity-page/statistics/shippingCapacityStatistics'),
            name: 'ShippingCapacityStatistics',
            meta: { title: '协议货代海运装箱量', keepAlive: true }
          },
          {
            path: 'book-space-remind',
            component: () => import('@/views/entity-page/statistics/actRrtBookingDetailedStatistics'),
            name: 'ActRrtBookingDetailedStatistics',
            meta: { title: '晚7天订舱提醒', keepAlive: true }
          },
          {
            path: 'book-space-good-info',
            component: () => import('@/views/entity-page/statistics/actSaleBookingDeliveryReportSelectStatistics'),
            name: 'ActSaleBookingDeliveryReportSelectStatistics',
            meta: { title: '订舱发货信息表', keepAlive: true }
          },
          {
            path: 'freight-statement',
            component: () => import('@/views/entity-page/statistics/freightStatementStatistics'),
            name: 'FreightStatementStatistics',
            meta: { title: '运费清单报表', keepAlive: true }
          },
          {
            path: 'Production-statement',
            component: () => import('@/views/entity-page/statistics/queryProductionPlan'),
            name: 'QueryProductionPlan',
            meta: { title: '生产计划查询', keepAlive: true }
          },
          {
            path: 'Material-document',
            component: () => import('@/views/entity-page/statistics/materialDocument'),
            name: 'MaterialDocument',
            meta: { title: '物料凭证明细报表', keepAlive: true }
          },
          {
            path: 'de-part-fee-by-invoice',
            component: () => import('@/views/entity-page/statistics/departFeeByInvoice'),
            name: 'Departfeebyinvoice',
            meta: { title: '发货费用汇总查询', keepAlive: true }
          },
          {
            path: 'de-part-fee-by-register',
            component: () => import('@/views/entity-page/statistics/departFeeByRegister'),
            name: 'Departfeebyregister',
            meta: { title: '费用明细查询', keepAlive: true }
          },
        ]
      },
      {
        path: 'report-DZ',
        component: () => import('@/views/entity-page/index'),
        meta: { title: '单证报表' },
        name: 'reportDZ',
        children: [
          {
            path: 'document-week-kanban',
            component: () => import('@/views/entity-page/statistics/documentWeekKanbanStatistics'),
            name: 'DocumentWeekKanbanStatistics',
            meta: { title: '海外单证周看板', keepAlive: true }
          },
          {
            path: 'customs-clearance-documents',
            component: () => import('@/views/entity-page/statistics/customsClearanceDocumentsStatistics'),
            name: 'CustomsClearanceDocumentsStatistics',
            meta: { title: '清关单据出单报表', keepAlive: true }
          },
          {
            path: 'document-visualization',
            component: () => import('@/views/entity-page/statistics/documentVisualization'),
            name: 'DocumentVisualization',
            meta: { title: '单证可视化流程报表', keepAlive: true }
          },
          {
            path: 'document-early-warning',
            component: () => import('@/views/entity-page/statistics/documentEarlyWarningStatistics'),
            name: 'DocumentEarlyWarningStatistics',
            meta: { title: '单证预警报表', keepAlive: true }
          },
          {
            path: 'query-efficiencyr-report',
            component: () => import('@/views/entity-page/statistics/queryEfficiencyrEeportStatistics'),
            name: 'DZEfficiencyManagement',
            meta: { title: '单证效率报表', keepAlive: true }
          },
          {
            path: 'dispatch-but-undeclare',
            component: () => import('@/views/entity-page/dispatch-but-undeclare/dispatchButUndeclarePage'),
            name: 'dispatchButUndeclare',
            meta: { title: '发货未报关报表', keepAlive: true }
          },
          {
            path: 'time-liness-of-financial-information',
            component: () => import('@/views/entity-page/statistics/timelinessOfFinancialInformationStatistics'),
            name: 'TimelinessOfFinancialInformationStatistics',
            meta: { title: '财务资料及时性汇总表', keepAlive: true }
          },
          {
            path: 'bill-promptness',
            component: () => import('@/views/entity-page/statistics/billPromptness'),
            name: 'BillPromptnessManagement',
            meta: { title: '提单到单及时性报表', keepAlive: true }
          },
        ]
      },
    ]
  },
]

export default auxRouter
