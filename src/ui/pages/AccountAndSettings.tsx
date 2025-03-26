import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface AccountSettingsViewProps {
  vm: MainViewModel;
}

const AccountSettingsView: React.FC<AccountSettingsViewProps> = ({ vm }) => {
  return (
    <div className="border base">
      <div className="stack baseV">
        <button className="button round">
          <div className="stack leftH">
            <div style={{ width: 34, height: 34, borderRadius: 20 }}>
              <img width={22} height={22} src="/assets/Images/account.png" />
            </div>
            <span className="label base">{vm.accountName}</span>
          </div>
        </button>
        <button className="button round">
          <div className="stack leftH">
            <img width={22} height={22} src="/assets/Images/settings.png" />
            <span className="label base">Settings</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AccountSettingsView;
