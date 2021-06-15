// v3.1.3
function getProxies() {
    return new Promise((resolve) => {
      setTimeout(() => {
        $(document).ready(function () {
          //Looks for authToken in storage
          var authToken = window.localStorage.getItem("token");
          const targetElement = document.querySelector("#page-loader");
          bodyScrollLock.disableBodyScroll(targetElement);
  
          //If authtoken exists, request user from db
          if (authToken !== null) {
            var endpoint = new URL(
              "https://api.illusory.io/api:PEdrQKwo/auth/proxies"
            );
            const requestUser = () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  $(document).ready(
                    axios
                      .get(endpoint, {
                        headers: {
                          "Content-type": "application/json",
                          Authorization: "Bearer " + authToken,
                        },
                      })
                      .catch((error) => {
                        $("#errorMsg").show();
                        $("#errorTxt").html(error.response.data.message);
                      })
                      .then((response) => {
                        resolve();
                        if (response === undefined) {
                        } else {
                          if (response.data.Active_Customer === true) {
                            $("[lead_element]").hide();
                            new gridjs.Grid({
                              columns: [
                                {
                                  id: "Device_Name", //0
                                  name: "Proxy Name",
                                  formatter: (cell) => gridjs.html(`${cell}`),
                                },
                                {
                                  id: "CSS_ID", //1
                                  hidden: true,
                                },
                                {
                                  id: "Reset_IP_CSS", //2
                                  hidden: true,
                                },
                                {
                                  id: "Auto_Change_Value", //3
                                  hidden: true,
                                },
                                {
                                  id: "IPv6_DNS_Value", //4
                                  hidden: true,
                                },
                                {
                                  id: "Whitelist", //5
                                  hidden: true,
                                },
                                {
                                  id: "Super_Port_Button_CSS", //6
                                  hidden: true,
                                },
                                {
                                  id: "Super_Port_Button_Text", //7
                                  hidden: true,
                                },
                                {
                                    id: "Online Webhook", //8
                                    hidden: true,
                                  },
                                {
                                  id: "ISP_Name",
                                  name: "ISP Name",
                                },
                                {
                                  id: "lastIpChangeHuman",
                                  name: "Last IP Change",
                                },
                                {
                                  name: "Change IP",
                                  formatter: (_, row) =>
                                    gridjs.html(
                                      `<button id="reset-${row.cells[0].data}" class="${row.cells[2].data}" name="${row.cells[0].data}" onclick="resetIp(this)">Get New IP</button>`
                                    ),
                                },
                                {
                                  name: "Auto-Change IP",
                                  formatter: (_, row) =>
                                    gridjs.html(`
  
                                    <select id="changeId-${row.cells[0].data}" class="autoChangeMin" onchange="changeAuto(this.id)"> <option value="none" selected disabled hidden> ${row.cells[3].data} </option> <option value="0">Disabled</option> </select>
                                    
                                    `),
                                },
                                {
                                  name: "Go IPv6 Only",
                                  formatter: (_, row) =>
                                    gridjs.html(`
                                    
                                    <select id="ipv6Dns-${row.cells[0].data}" class="ipv6Dns" onchange="changeDns(this.id)"> <option value="none" selected="" disabled="" hidden=""> ${row.cells[4].data} </option> <option value="Disabled"> Disabled</option> </select>
                                    
                                    `),
                                },
                                {
                                  name: "superPort",
                                  formatter: (_, row) =>
                                    gridjs.html(`
                                    
                                    <button class="${row.cells[6].data}" name="${row.cells[0].data}" onclick="superPortChange(this)">${row.cells[7].data}</button>
                                    
                                    `),
                                },
                                {
                                  id: "Location",
                                  name: "Location",
                                },
                                {
                                  id: "H_Connections",
                                  name: "HTTP Connections",
                                },
                                {
                                  id: "S_Connections",
                                  name: "SOCKS5 Connections",
                                },
                                {
                                  id: "Proxy_Server_IP",
                                  name: "Proxy IP",
                                },
                                {
                                  id: "H_Port",
                                  name: "HTTP Port",
                                },
                                {
                                  id: "S_Port",
                                  name: "SOCKS5 Port",
                                },
                                {
                                  id: "Username",
                                  name: "Username",
                                },
                                {
                                  id: "Password",
                                  name: "Password",
                                },
                                {
                                  name: "Whitelist IP",
                                  formatter: (_, row) =>
                                    gridjs.html(`
                                    
                                    <input type="text" value="${row.cells[5].data}" placeholder="123.123.123.123" class="authUser" id="whitelistId-${row.cells[0].data}" oninput="changeWhitelist(this.id)"><button id="whitelistId-${row.cells[0].data}-btn" class="updateBtn" name="${row.cells[0].data}" onclick="updateWhitelist(this.id)">Update</button>
                                    `),
                                },
                                {
                                    name: "Online Status Webhook",
                                    formatter: (_, row) =>
                                      gridjs.html(`
                                      
                                      <input type="text" value="${row.cells[8].data}" placeholder="https://webhook.site/example-trigger" class="whInput" id="onlineWhId-${row.cells[0].data}" oninput="changeOnlineWh(this.id)"><button id="onlineWhId-${row.cells[0].data}-btn" class="updateBtn" name="${row.cells[0].data}" onclick="updateOnlineWh(this.id)">Update</button>
                                      `),
                                  }
                              ],
                              sort: true,
                              search: true,
                              pagination: true,
                              data: response.data.getProxies,
                              language: {
                                search: {
                                  placeholder:
                                    "🔍 Search proxy by port or name ...",
                                },
                              },
                              style: {
                                table: {
                                  border: "3px solid #ccc",
                                },
                                th: {
                                  "background-color": "rgba(0, 0, 0, 0.1)",
                                  color: "#000",
                                  "border-bottom": "3px solid #ccc",
                                  "text-align": "center",
                                },
                                td: {
                                  "text-align": "center",
                                },
                              },
                            }).render(document.getElementById("wrapper"));
                          } else {
                            // window.location.replace("/overview")
                            $("[customer_element]").hide();
                            $("[customer_link]").attr("src", "#");
                            console.log("Not a customer!");
                          }
                        }
                      })
                  );
                });
              }, 200);
            };
  
            async function gettingUser() {
              //console.log("Starting getUser async...");
              await requestUser();
            }
            gettingUser();
            console.log("User logged in.");
          } else {
          }
        });
        resolve("Grid proxies loaded...");
      }, 500);
    });
  }
