import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../helpers/fakebackend_helper";

const Navdata = () => {
  const history = useNavigate();
  //state data

  const [isProject, setIsProject] = useState(false);
  const [isModule, setIsModule] = useState(false);
  const [isUsers, setIsUsers] = useState(false);

  const authUser = getLoggedInUser();
  const isAdmin = authUser.role === "admin";

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    if (iscurrentState === "Project") {
      history("/project");
      setIsProject(false);
    }

    if (iscurrentState === "Modules") {
      history("/modules");
      setIsModule(false);
    }
  }, [history, iscurrentState, isProject, isModule]);

  const menuItems = [
    // {
    //   label: "Menu",
    //   isHeader: true,
    // },
    {
      id: "document-search",
      label: "Document Search",
      icon: "ri-honour-line",
      link: "#",
      click: function (e) {
        e.preventDefault();
      },
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-honour-line",
      link: "/dashboard",
      click: function (e) {
        e.preventDefault();
      },
    },
    {
      id: "system-configuration",
      label: "System Configuration",
      icon: "ri-honour-line",
      onclick: function (e) {},
      subItems: [
        {
          label: "Primary Setting",
          link: "#",
        },
        {
          label: "Email Setting",
          link: "#",
          // link: "/velzon/react/saas/nft-landing",
        },
        {
          label: "External Access Control",
          link: "/velzon/react/saas/job-landing",
        },
      ],
    },
    {
      id: "user-management",
      label: "User Management",
      icon: "ri-honour-line",
      onclick: function (e) {},
      subItems: [
        {
          label: "Users",
          link: "/employee",
        },
        {
          label: "Role & Permissions",
          link: "/role",
        },
      ],
    },
    {
      id: "archival-submission",
      label: "Archival Submission",
      icon: "ri-file-text-line",
      onclick: function (e) {},
      subItems: [
        {
          label: "Document Submission",
          link: "#",
        },
        {
          label: "My Workspace Documents",
          link: "#",
        },
        {
          label: "In-Progress Documents",
          link: "#",
        },
        {
          label: "Returned Documents",
          link: "#",
        },
        {
          label: "Rejected Documents",
          link: "#",
        },
        {
          label: "Approved Documents",
          link: "#",
        },
      ],
    },
    {
      id: "report-analysis",
      label: "Report & Analysis",
      icon: "ri-honour-line",
      link: "#",
      click: function (e) {
        e.preventDefault();
      },
    },
    {
      id: "expiry-management",
      label: "Expiry Management",
      icon: "ri-honour-line",
      link: "#",
      click: function (e) {
        e.preventDefault();
      },
    },
    {
      id: "primary-information-management",
      label: "Primary Info Management",
      icon: "ri-file-text-line",
      onclick: function (e) {},
      subItems: [
        {
          label: "Branch",
          link: "/branch",
        },
        {
          label: "Department",
          link: "/department",
        },
        {
          label: "Document Type",
          link: "/documenttype",
        },
        {
          label: "Document Category",
          link: "/documentcategory",
        },
      ],
    },
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
