import {Outlet} from "react-router-dom";

const AppLayout = ({children}) => {
  return (
    <div className="app-layout">
      <Outlet></Outlet>
      {/* Header */}
      <header className="app-header">
        <div className="logo">Header</div>
      </header>
      {/* Content */}
      <main className="app-content">{children}</main>

      {/* Footer */}
      <footer className="app-footer">
        Bản quyền © 2023. Tất cả các quyền đã được bảo lưu.
      </footer>
    </div>
  );
};

export default AppLayout;
