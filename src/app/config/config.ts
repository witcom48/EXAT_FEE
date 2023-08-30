export class AppConfig {
  constructor() {

  }
  
  UrlApi: string = "http://localhost:32208"
  ApiMainModule: string = this.UrlApi + "/BpcOpr.svc/BpcOpr";
  ApiSystemModule: string = this.UrlApi + "/Module_System/ModuleSystem.svc/System";
  ApiAttendanceModule: string = this.UrlApi + "/Module_Attendance/ModuleAttendance.svc/Attendance";
  ApiRecruitmentModule: string = this.UrlApi + "/Module_Recruitment/ModuleRecruitment.svc/Recruitment";
  ApiEmployeeModule: string = this.UrlApi + "/Module_Employee/ModuleEmployee.svc/Employee";
  ApiProjectModule: string = this.UrlApi + "/Module_Project/ModuleProject.svc/Project";
  ApiSelfServicesModule: string = this.UrlApi + "/Module_SelfServices/ModuleSelfServices.svc/SelfServices";
  ApiPayrollModule: string = this.UrlApi + "/Module_Payroll/ModulePayroll.svc/Payroll";



  static SESSIONInitial: string = "SESSIONInitial";


  ApiGetToken : string = "http://localhost:5000"
  ApiEasypassFeeModule : string = "http://localhost:5000/v1"


  ApiETaxSign : string = "https://etaxuat.exat.co.th/etaxService/api/v1/Sign/SignDocument"
  ApiETaxToken : string = "http://etaxdev.exat.co.th/etaxService/api/v1/login/auth"

  ApiETaxUsername : string = "crm001"
  ApiETaxPassword : string = "password1"

  ETaxFormNumber: string = "แบบฟอร์ม 3202"
  ETaxChannel: string = "MTC"
  ETaxTopic: string = "MTC002"
  ETaxServiceType: string = "001"
  ETaxDetail: string = "ค่ารักษาบัญชีบัตร Easy Pass"


}
