//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AlphaLocalDB
{
    using System;
    using System.Collections.Generic;
    
    public partial class WorkFlowExecutionStatu
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WorkFlowExecutionStatu()
        {
            this.WorkFlowExecutionLogs = new HashSet<WorkFlowExecutionLog>();
        }
    
        public long Id { get; set; }
        public string Status { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WorkFlowExecutionLog> WorkFlowExecutionLogs { get; set; }
    }
}
