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
    
    public partial class TestCycle
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string ApplicationName { get; set; }
        public string ApplicationType { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public int StatusId { get; set; }
    
        public virtual TestCycleStatu TestCycleStatu { get; set; }
    }
}
