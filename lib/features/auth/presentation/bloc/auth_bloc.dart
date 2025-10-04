import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:progres/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:progres/features/auth/data/models/auth_response.dart';
import 'package:progres/features/enrollment/presentation/bloc/enrollment_bloc.dart';
import 'package:progres/features/enrollment/presentation/bloc/enrollment_event.dart';
import 'package:progres/features/groups/presentation/bloc/groups_bloc.dart';
import 'package:progres/features/profile/presentation/bloc/profile_bloc.dart';
import 'package:progres/features/subject/presentation/bloc/subject_bloc.dart';
import 'package:progres/features/transcript/presentation/bloc/transcript_bloc.dart';
import 'package:progres/features/transcript/presentation/bloc/transcript_event.dart';
import 'package:progres/features/timeline/presentation/blocs/timeline_bloc.dart';

// Events
abstract class AuthEvent {}

class LoginEvent extends AuthEvent {
  final String username;
  final String password;

  LoginEvent({required this.username, required this.password});
}

class LogoutEvent extends AuthEvent {
  final BuildContext? context;

  LogoutEvent({this.context});
}

class CheckAuthStatusEvent extends AuthEvent {}

// States
abstract class AuthState {}

class AuthInitial extends AuthState {}

class AuthLoading extends AuthState {}

class AuthSuccess extends AuthState {
  final AuthResponse response;
  AuthSuccess(this.response);
}

class AuthError extends AuthState {
  final String message;
  AuthError(this.message);
}

class AuthLoggedOut extends AuthState {}

class AuthChecking extends AuthState {}

// Bloc
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepositoryImpl authRepository;

  AuthBloc({required this.authRepository}) : super(AuthInitial()) {
    on<LoginEvent>(_onLogin);
    on<LogoutEvent>(_onLogout);
    on<CheckAuthStatusEvent>(_onCheckAuthStatus);
  }

  Future<void> _onLogin(LoginEvent event, Emitter<AuthState> emit) async {
    try {
      emit(AuthLoading());
      final response = await authRepository.login(
        event.username,
        event.password,
      );
      emit(AuthSuccess(response));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  Future<void> _onLogout(LogoutEvent event, Emitter<AuthState> emit) async {
    try {
      emit(AuthLoading());
      await authRepository.logout();

      try {
        event.context?.read<TranscriptBloc>().add(const ClearTranscriptCache());
      } catch (e) {
        print('Note: Could not clear transcript cache. ${e.toString()}');
      }
      try {
        event.context?.read<TimelineBloc>().add(ClearTimelineCache());
      } catch (e) {
        print('Note: Could not clear timeline cache. ${e.toString()}');
      }

      try {
        event.context?.read<EnrollmentBloc>().add(ClearEnrollmentsCache());
      } catch (e) {
        print('Note: Could not clear enrollment cache. ${e.toString()}');
      }

      try {
        event.context?.read<StudentGroupsBloc>().add(ClearGroupsCache());
      } catch (e) {
        print('Note: Could not clear groups cache. ${e.toString()}');
      }

      try {
        event.context?.read<SubjectBloc>().add(ClearSubjectCache());
      } catch (e) {
        print('Note: Could not clear subject cache. ${e.toString()}');
      }
      try {
        event.context?.read<ProfileBloc>().add(ClearProfileCacheEvent());
      } catch (e) {
        print('Note: Could not clear profile cache. ${e.toString()}');
      }

      emit(AuthLoggedOut());
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  Future<void> _onCheckAuthStatus(
    CheckAuthStatusEvent event,
    Emitter<AuthState> emit,
  ) async {
    try {
      emit(AuthChecking());
      final isLoggedIn = await authRepository.isLoggedIn();
      if (isLoggedIn) {
        // We don't have the actual auth response here, but we can use a placeholder
        // The app will get actual data from the profile bloc
        emit(
          AuthSuccess(
            AuthResponse(
              expirationDate: '',
              token: '',
              userId: 0,
              uuid: '',
              idIndividu: 0,
              etablissementId: 0,
              userName: '',
            ),
          ),
        );
      } else {
        emit(AuthLoggedOut());
      }
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }
}
