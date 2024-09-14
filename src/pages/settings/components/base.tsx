import {
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import { queryCurrent } from '../service';
import useStyles from './index.style';

const BaseView: React.FC = () => {
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
  return (
    <div className={styles.baseView}>
      <ProForm
        // layout="inline"
        labelCol={{ span: 4 }}
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
      >
        <ProFormSwitch
          colProps={{
            span: 4,
          }}
          initialValue={true}
          label="启动服务"
          name="grid2"
        />
        <ProFormSwitch
          colProps={{
            span: 4,
          }}
          initialValue={true}
          label="下载弹幕"
          name="grid"
        />
        <ProFormDigit
          name="num"
          width="xs"
          label="扫描间隔"
          addonAfter="分钟"
          initialValue={20}
          max={60}
          min={5}
        />
        <ProFormSelect
          width="xs"
          label="时间类型"
          name="level"
          tooltip="表示在视频信息中使用的时间类型"
          valueEnum={{
            1: '收藏时间',
            2: '发布时间',
            3: '下载时间',
          }}
        />
        <ProFormText
          width="sm"
          label="视频目录"
          name="level"
          initialValue="{{bvid}}"
          tooltip="表示在视频信息中使用的时间类型"
          help="{{bvid}}视频BVID、{{title}}视频标题、{{upper_name}}UP主昵称、{{upper_mid}}UP主ID、{{YYYY}}年份、{{MM}}月份、{{DD}}日期"
        />
        <ProFormText
          width="sm"
          label="合集目录"
          name="level"
          help="除支持视频目录命名的全部参数外，还支持{{ptitle}}分P标题、{{index}}分P序号、{{cid}}分PID"
        />
        <ProFormText
          width="sm"
          label="视频资源"
          name="sp"
          initialValue="{{cid}}"
          disabled
          tooltip="未保证不冲突视频、封面等资源均用cid作为唯一标识"
          help="{{cid}}分PID"
        />
        <ProFormCheckbox.Group name="xxxx" label="下载栏目" options={['12121', '33333']} />
        <ProFormSelect
          name="op1"
          mode="tags"
          tooltip="低于被选中的视频格式和质量将会被忽略"
          help="为了更好的体验，本程序默认下载可下载的最高画质，暂时没有提供画质选择计划"
          label="视频质量"
          options={[
            {
              value: '1',
              label: '3333',
            },
            {
              value: '2',
              label: '4333',
            },
          ]}
        />
      </ProForm>
    </div>
  );
};
export default BaseView;
