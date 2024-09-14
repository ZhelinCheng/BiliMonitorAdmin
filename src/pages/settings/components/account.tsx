import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import { queryCurrent } from '../service';
import useStyles from './index.style';

const AccountView: React.FC = () => {
  const { styles } = useStyles();
  // 头像组件 方便以后独立，增加裁剪之类的功能
  const { data: currentUser } = useRequest(() => {
    return queryCurrent();
  });
  /*  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  }; */
  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };
  // credential = Credential(sessdata="你的 SESSDATA", bili_jct="你的 bili_jct", buvid3="你的 buvid3", dedeuserid="你的 DedeUserID", ac_time_value="你的 ac_time_value")
  return (
    <div className={styles.baseView}>
      <ProForm
        // layout="inline"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            resetText: '重置',
            submitText: '保存并更新',
          },
          render: (_, dom) => dom[1],
        }}
        initialValues={{
          ...currentUser,
          phone: currentUser?.phone.split('-'),
        }}
        hideRequiredMark
      >
        <ProFormText name="a1" width="sm" label="sessdata" />
        <ProFormText name="a2" width="sm" label="bili_jct" />
        <ProFormText name="a3" width="sm" label="buvid3" />
        <ProFormText name="a4" width="sm" label="dedeuserid" />
        <ProFormText name="a5" width="sm" label="ac_time_value" />
      </ProForm>
    </div>
  );
};
export default AccountView;
