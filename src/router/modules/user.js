const ImportOrCreateWords = () => import(/* webpackChunkName: "group-user" */ '@/views/user/ImportOrCreateWords.vue')
const CreateAddress = () => import(/* webpackChunkName: "group-user" */ '@/views/user/CreateAddress.vue')
const ImportAddress = () => import(/* webpackChunkName: "group-user" */ '@/views/user/ImportAddress.vue')
const BackupsWallet = () => import('@/views/user/BackupsWallet.vue')
const VerifyingAuxiliaries = () => import('@/views/user/VerifyingAuxiliaries.vue')
const WalletCompleted = () => import('@/views/user/WalletCompleted.vue')
// const InputMnemonicWords = () => import(/* webpackChunkName: "group-user" */ '@/views/user/InputMnemonicWords.vue')
// const BackupMnemonicWords = () => import(/* webpackChunkName: "group-user" */ '@/views/user/BackupMnemonicWords.vue')

export default [
  {
    path: '/importOrCreateWords',
    name: 'ImportOrCreateWords',
    component: ImportOrCreateWords
  },
  {
    path: '/createAddress',
    name: 'CreateAddress',
    component: CreateAddress
  },
  {
    path: '/importAddress',
    name: 'ImportAddress',
    component: ImportAddress
  },
  {
    path: '/BackupsWallet',
    name: 'BackupsWallet',
    component: BackupsWallet
  },
  {
    path: '/VerifyingAuxiliaries',
    name: 'VerifyingAuxiliaries',
    component: VerifyingAuxiliaries
  },
  {
    path: '/WalletCompleted',
    name: 'WalletCompleted',
    component: WalletCompleted
  }
  // {
  //   path: '/inputMnemonicWords',
  //   name: 'InputMnemonicWords',
  //   component: InputMnemonicWords
  // },
  // {
  //   path: '/backupMnemonicWords',
  //   name: 'BackupMnemonicWords',
  //   component: BackupMnemonicWords
  // }
]