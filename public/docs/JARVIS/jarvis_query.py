#!/usr/bin/env python3
"""
JARVIS Query System - Phase 1
Enables querying JARVIS_LOG.json for proactive context recall

Usage:
    from jarvis_query import JARVISLog
    log = JARVISLog('JARVIS_LOG.json')
    blockers = log.get_blockers(project='rapid', status='BLOCKED_WAITING')
    decisions = log.get_decisions(project='rapid', sort_by='date')
"""

import json
from typing import List, Dict, Any, Optional
from datetime import datetime
from pathlib import Path


class JARVISLog:
    """Query interface for JARVIS structured event log."""
    
    def __init__(self, log_path: str = 'JARVIS_LOG.json'):
        """Initialize with path to JARVIS_LOG.json"""
        with open(log_path, 'r') as f:
            self.data = json.load(f)
        self.projects = {p['id']: p for p in self.data['projects']}
        self.decisions = self.data['decisions']
        self.discoveries = self.data['discoveries']
        self.blockers = self.data['blockers']
        self.assets = self.data['assets']
        self.people = {p['id']: p for p in self.data['people']}
        self.milestones = self.data['milestones']
        self.relationships = self.data.get('relationships', {})
    
    # ─────────────────────────────────────────────────────────
    # BLOCKER QUERIES
    # ─────────────────────────────────────────────────────────
    
    def get_blockers(self, project: Optional[str] = None, 
                     status: Optional[str] = None,
                     severity: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get blockers, optionally filtered by project/status/severity.
        
        Example:
            blockers = log.get_blockers(project='rapid', status='BLOCKED_WAITING')
        """
        results = self.blockers
        
        if project:
            results = [b for b in results if b.get('project') == project]
        
        if status:
            results = [b for b in results if b.get('status') == status]
        
        if severity:
            results = [b for b in results if b.get('severity') == severity]
        
        return sorted(results, key=lambda x: x.get('date'), reverse=True)
    
    def get_active_blockers(self, project: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get unresolved blockers for a project.
        
        Example:
            active = log.get_active_blockers(project='rapid')
        """
        results = [b for b in self.blockers if b.get('status') != 'RESOLVED']
        
        if project:
            results = [b for b in results if b.get('project') == project]
        
        severity_order = {'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3}
        return sorted(results, key=lambda x: severity_order.get(x.get('severity'), 99))
    
    def blocker_summary(self, project: str) -> str:
        """Human-readable blocker summary for a project.
        
        Example:
            print(log.blocker_summary('rapid'))
            # Output: "RAPID has 2 blockers: ads pending (waiting on creatives), pixel not configured"
        """
        blockers = self.get_active_blockers(project=project)
        
        if not blockers:
            return f"{project} has no active blockers ✅"
        
        titles = [b['title'] for b in blockers]
        count = len(blockers)
        
        if count == 1:
            return f"{project} has 1 blocker: {titles[0]}"
        else:
            summary = ", ".join(titles[:-1])
            return f"{project} has {count} blockers: {summary}, {titles[-1]}"
    
    # ─────────────────────────────────────────────────────────
    # DECISION QUERIES
    # ─────────────────────────────────────────────────────────
    
    def get_decisions(self, project: Optional[str] = None,
                      sort_by: str = 'date',
                      limit: Optional[int] = None) -> List[Dict[str, Any]]:
        """Get decisions, optionally filtered by project.
        
        Example:
            decisions = log.get_decisions(project='rapid', limit=5)
        """
        results = self.decisions
        
        if project:
            results = [d for d in results if d.get('project') == project]
        
        if sort_by == 'date':
            results = sorted(results, key=lambda x: x.get('date'), reverse=True)
        
        if limit:
            results = results[:limit]
        
        return results
    
    def get_decision_by_title(self, title_substring: str) -> Optional[Dict[str, Any]]:
        """Find decision by partial title match.
        
        Example:
            dec = log.get_decision_by_title('Advantage Audience')
        """
        for decision in self.decisions:
            if title_substring.lower() in decision.get('title', '').lower():
                return decision
        return None
    
    def decision_rationale(self, project: str, decision_title: str) -> str:
        """Get human-readable decision rationale.
        
        Example:
            print(log.decision_rationale('rapid', 'Advantage Audience'))
        """
        decision = self.get_decision_by_title(decision_title)
        if not decision:
            return f"No decision found matching '{decision_title}'"
        
        return f"{decision['title']}\n" \
               f"  Chosen: {decision.get('chosen', 'N/A')}\n" \
               f"  Rationale: {decision.get('rationale', 'N/A')}\n" \
               f"  Reversibility: {decision.get('reversibility', 'N/A')}\n" \
               f"  Status: {decision.get('status', 'N/A')}"
    
    # ─────────────────────────────────────────────────────────
    # DISCOVERY QUERIES
    # ─────────────────────────────────────────────────────────
    
    def get_discoveries(self, project: Optional[str] = None,
                       significance: Optional[str] = None,
                       discovery_type: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get discoveries, optionally filtered.
        
        Example:
            findings = log.get_discoveries(project='rapid', significance='HIGH')
        """
        results = self.discoveries
        
        if project:
            results = [d for d in results if d.get('project') == project]
        
        if significance:
            results = [d for d in results if d.get('significance') == significance]
        
        if discovery_type:
            results = [d for d in results if d.get('type') == discovery_type]
        
        return sorted(results, key=lambda x: x.get('date'), reverse=True)
    
    def critical_discoveries(self) -> List[Dict[str, Any]]:
        """Get all critical or high-significance discoveries across all projects."""
        results = [d for d in self.discoveries 
                  if d.get('significance') in ['CRITICAL', 'HIGH']]
        return sorted(results, key=lambda x: x.get('date'), reverse=True)
    
    # ─────────────────────────────────────────────────────────
    # MILESTONE QUERIES
    # ─────────────────────────────────────────────────────────
    
    def get_milestones(self, project: Optional[str] = None,
                      status: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get milestones for a project.
        
        Example:
            milestones = log.get_milestones(project='rapid')
        """
        results = self.milestones
        
        if project:
            results = [m for m in results if m.get('project') == project]
        
        if status:
            results = [m for m in results if m.get('status') == status]
        
        return sorted(results, key=lambda x: x.get('date'))
    
    def next_milestone(self, project: str) -> Optional[Dict[str, Any]]:
        """Get the next upcoming milestone for a project.
        
        Example:
            next_m = log.next_milestone('rapid')
        """
        milestones = self.get_milestones(project=project, status='PLANNED')
        if milestones:
            return milestones[0]
        
        in_progress = self.get_milestones(project=project, status='IN_PROGRESS')
        return in_progress[0] if in_progress else None
    
    def milestone_status(self, project: str) -> str:
        """Human-readable milestone status for a project.
        
        Example:
            print(log.milestone_status('rapid'))
        """
        milestone = self.next_milestone(project)
        if not milestone:
            return f"No upcoming milestones for {project}"
        
        date = milestone.get('date', 'TBD')
        title = milestone.get('title', 'Unknown')
        status = milestone.get('status', 'Unknown')
        
        return f"Next milestone: {title} ({date}) - {status}"
    
    # ─────────────────────────────────────────────────────────
    # PROJECT QUERIES
    # ─────────────────────────────────────────────────────────
    
    def get_project(self, project_id: str) -> Optional[Dict[str, Any]]:
        """Get a project by ID."""
        return self.projects.get(project_id)
    
    def project_status_brief(self, project_id: str) -> str:
        """Get a brief status summary for a project.
        
        Example:
            print(log.project_status_brief('rapid'))
        """
        project = self.get_project(project_id)
        if not project:
            return f"Project '{project_id}' not found"
        
        name = project.get('name', 'Unknown')
        status = project.get('status', 'Unknown')
        phase = project.get('current_phase', 'Unknown')
        next_milestone = project.get('next_milestone', 'TBD')
        
        blockers = self.get_active_blockers(project=project_id)
        blocker_count = len(blockers)
        
        summary = f"{name} ({status})\n" \
                 f"  Phase: {phase}\n" \
                 f"  Next: {next_milestone}\n"
        
        if blocker_count > 0:
            summary += f"  ⚠️  {blocker_count} active blocker(s)"
        else:
            summary += f"  ✅ No blockers"
        
        return summary
    
    # ─────────────────────────────────────────────────────────
    # RELATIONSHIP QUERIES
    # ─────────────────────────────────────────────────────────
    
    def get_project_impacts(self, project_id: str) -> List[str]:
        """Get how a project impacts others.
        
        Example:
            impacts = log.get_project_impacts('rapid')
        """
        impact_keys = [k for k in self.relationships.keys() if k.startswith(project_id)]
        return [self.relationships[k].get('description', '') for k in impact_keys]
    
    def get_affected_by(self, project_id: str) -> List[str]:
        """Get which projects affect this one.
        
        Example:
            deps = log.get_affected_by('grand_tour')
        """
        affected = []
        for rel_key, rel_data in self.relationships.items():
            if project_id in rel_key and rel_key.endswith(project_id):
                affected.append(rel_data.get('description', ''))
        return affected
    
    # ─────────────────────────────────────────────────────────
    # ASSET QUERIES
    # ─────────────────────────────────────────────────────────
    
    def get_critical_assets(self) -> List[Dict[str, Any]]:
        """Get all critical assets across all projects."""
        return [a for a in self.assets if a.get('critical', False)]
    
    def get_project_assets(self, project_id: str) -> List[Dict[str, Any]]:
        """Get assets used by a project.
        
        Example:
            assets = log.get_project_assets('rapid')
        """
        return [a for a in self.assets if project_id in a.get('projects', [])]
    
    # ─────────────────────────────────────────────────────────
    # CONTEXT GENERATION (for proactive briefing)
    # ─────────────────────────────────────────────────────────
    
    def generate_context_for_project(self, project_id: str) -> str:
        """Generate full context briefing for a project.
        
        Example:
            context = log.generate_context_for_project('rapid')
            print(context)
        """
        project = self.get_project(project_id)
        if not project:
            return f"Project '{project_id}' not found"
        
        brief = f"\n{'='*60}\n"
        brief += f"PROJECT: {project.get('name', 'Unknown')}\n"
        brief += f"{'='*60}\n\n"
        
        # Status
        brief += f"📊 STATUS\n"
        brief += f"  State: {project.get('status', 'Unknown')}\n"
        brief += f"  Phase: {project.get('current_phase', 'Unknown')}\n"
        brief += f"  Owner: {project.get('owner', 'Unknown')}\n\n"
        
        # Blockers
        blockers = self.get_active_blockers(project=project_id)
        if blockers:
            brief += f"⚠️  BLOCKERS ({len(blockers)})\n"
            for blocker in blockers:
                brief += f"  • {blocker.get('title', 'Unknown')}\n"
                brief += f"    Status: {blocker.get('status', 'Unknown')}\n"
                brief += f"    Target fix: {blocker.get('target_resolution', 'TBD')}\n"
            brief += "\n"
        else:
            brief += f"✅ NO BLOCKERS\n\n"
        
        # Recent decisions
        decisions = self.get_decisions(project=project_id, limit=3)
        if decisions:
            brief += f"📋 RECENT DECISIONS\n"
            for decision in decisions:
                brief += f"  • {decision.get('title', 'Unknown')}\n"
                brief += f"    Chosen: {decision.get('chosen', 'N/A')}\n"
            brief += "\n"
        
        # Key discoveries
        discoveries = self.get_discoveries(project=project_id, significance='HIGH')
        if discoveries:
            brief += f"💡 KEY DISCOVERIES\n"
            for disco in discoveries[:2]:
                brief += f"  • {disco.get('title', 'Unknown')}\n"
            brief += "\n"
        
        # Next milestone
        milestone = self.next_milestone(project_id)
        if milestone:
            brief += f"🎯 NEXT MILESTONE\n"
            brief += f"  {milestone.get('title', 'Unknown')}\n"
            brief += f"  Target: {milestone.get('date', 'TBD')}\n"
            brief += f"  Status: {milestone.get('status', 'Unknown')}\n\n"
        
        # Impacts
        impacts = self.get_project_impacts(project_id)
        if impacts:
            brief += f"🔗 IMPACTS\n"
            for impact in impacts:
                brief += f"  • {impact}\n"
            brief += "\n"
        
        brief += f"{'='*60}\n"
        return brief


# ─────────────────────────────────────────────────────────
# EXAMPLE USAGE
# ─────────────────────────────────────────────────────────

if __name__ == '__main__':
    # Initialize
    log = JARVISLog('JARVIS_LOG.json')
    
    print("\n" + "="*60)
    print("JARVIS QUERY SYSTEM - TEST QUERIES")
    print("="*60 + "\n")
    
    # Query 1: What's blocking RAPID?
    print("Query 1: What's blocking RAPID?")
    print("-" * 60)
    blockers = log.get_blockers(project='rapid', status='BLOCKED_WAITING')
    print(f"Result: {len(blockers)} blocker(s)")
    for b in blockers:
        print(f"  • {b['title']}")
    print()
    
    # Query 2: RAPID decisions
    print("Query 2: What decisions have we made about RAPID?")
    print("-" * 60)
    decisions = log.get_decisions(project='rapid')
    print(f"Result: {len(decisions)} decision(s)")
    for d in decisions[:3]:
        print(f"  • {d['title']}")
    print()
    
    # Query 3: Discoveries
    print("Query 3: High-significance discoveries")
    print("-" * 60)
    discoveries = log.critical_discoveries()
    print(f"Result: {len(discoveries)} discovery(ies)")
    for d in discoveries[:3]:
        print(f"  • {d['title']}")
    print()
    
    # Query 4: Next milestone
    print("Query 4: What's the next RAPID milestone?")
    print("-" * 60)
    milestone = log.next_milestone('rapid')
    if milestone:
        print(f"Result: {milestone['title']} ({milestone['date']})")
    print()
    
    # Query 5: Project context
    print("Query 5: Full RAPID context")
    print("-" * 60)
    print(log.generate_context_for_project('rapid'))
