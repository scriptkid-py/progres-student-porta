import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

class ContinuousAssessment {
  final bool absent;
  final String apCode; // Assessment type code (PRJ, TD, TP)
  final bool autorisationDemandeRecours;
  final int id;
  final int idDia;
  final String llPeriode;
  final String llPeriodeAr;
  final double? note;
  final String? observation;
  final String rattachementMcMcLibelleAr;
  final String rattachementMcMcLibelleFr;
  final bool? recoursAccorde;
  final bool? recoursDemande;

  ContinuousAssessment({
    required this.absent,
    required this.apCode,
    required this.autorisationDemandeRecours,
    required this.id,
    required this.idDia,
    required this.llPeriode,
    required this.llPeriodeAr,
    this.note,
    this.observation,
    required this.rattachementMcMcLibelleAr,
    required this.rattachementMcMcLibelleFr,
    this.recoursAccorde,
    this.recoursDemande,
  });

  factory ContinuousAssessment.fromJson(Map<String, dynamic> json) {
    return ContinuousAssessment(
      absent: json['absent'] as bool,
      apCode: json['apCode'] as String,
      autorisationDemandeRecours: json['autorisationDemandeRecours'] as bool,
      id: json['id'] as int,
      idDia: json['id_dia'] as int,
      llPeriode: json['llPeriode'] as String,
      llPeriodeAr: json['llPeriodeAr'] as String,
      note: json['note'] != null ? (json['note'] as num).toDouble() : null,
      observation: json['observation'] as String?,
      rattachementMcMcLibelleAr: json['rattachementMcMcLibelleAr'] as String,
      rattachementMcMcLibelleFr: json['rattachementMcMcLibelleFr'] as String,
      recoursAccorde: json['recoursAccorde'] as bool?,
      recoursDemande: json['recoursDemande'] as bool?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'absent': absent,
      'apCode': apCode,
      'autorisationDemandeRecours': autorisationDemandeRecours,
      'id': id,
      'id_dia': idDia,
      'llPeriode': llPeriode,
      'llPeriodeAr': llPeriodeAr,
      'note': note,
      'observation': observation,
      'rattachementMcMcLibelleAr': rattachementMcMcLibelleAr,
      'rattachementMcMcLibelleFr': rattachementMcMcLibelleFr,
      'recoursAccorde': recoursAccorde,
      'recoursDemande': recoursDemande,
    };
  }

  // Helper method to get the assessment type label
  String assessmentTypeLabel(BuildContext context) {
    switch (apCode) {
      case 'PRJ':
        return GalleryLocalizations.of(context)!.project;
      case 'TD':
        return GalleryLocalizations.of(context)!.tutorialWork;
      case 'TP':
        return GalleryLocalizations.of(context)!.practicalWork;
      default:
        return apCode;
    }
  }
}
